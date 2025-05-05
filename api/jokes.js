const fs = require('fs');
const path = require('path');
const db = require("../includes/db");
const url = require("url");
const { error } = require('console');

// get all jokes from the database
function handleGetAllJokes(res) {
    db.query("SELECT * FROM jokes", (err, results) => {
        if (err) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: "Database error", details: err.message }));
            return;
        }
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(results));
    });
}

function handleGetJokeById(id, res) {
    db.query("SELECT * FROM jokes WHERE id = ?", [id], (err, results) => {
        if (err || results.length === 0) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: "Joke not found" }));
            return;
        }
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: true, joke: results[0] }));
    });
}

function handleAddJoke(req, res) {
    let body = "";
    req.on("data", chunk => { body += chunk; });
    req.on("end", () => {
        const { content, author } = JSON.parse(body);
        if (!content || !author) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: "Missing content or author" }));
            return;
        }

        db.query("INSERT INTO jokes (content, author) VALUES (?, ?)", [content, author], (err, result) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ success: false, error: "Database error", details: err.message }));
                return;
            }
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: true, message: "Joke added successfully", jokeID: result.insertId }));
        });
    });
}

function handleUpdateJoke(id, req, res) {
    const { content, author } = req.body;

    if (!content || !author) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, error: "Missing content or author" }));
        return;
    }

    db.query("UPDATE jokes SET content = ?, author = ? WHERE id = ?", [content, author, id], (err, result) => {
        if (err || result.affectedRows === 0) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: "Joke not found or not updated" }));
            return;
        }
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: true, message: "Joke updated successfully" }));
    });
}

function handleDeleteJoke(id, res) {
    db.query("DELETE FROM jokes WHERE id = ?", [id], (err, result) => {
        if (err || result.affectedRows === 0) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: "Joke not found or already deleted" }));
            return;
        }
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: true, message: "Joke deleted successfully" }));
    });
}

function handleRequest(req, res) {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname.replace(/\/+$/, "");
    const method = req.method;

    // use startsWith()

    if (path.startsWith("/api/jokes/") && method === "GET") {
        const id = Number(path.split("/")[3]);
        if (!id || isNaN(id)) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: "Invalid ID" }));
            return;
        }
        handleGetJokeById(id, res);
        return;
    }

    if (path === "/api/jokes" && method === "GET") {
        const id = parsedUrl.query.id;
        if (id) {
            handleGetJokeById(Number(id), res);
        } else {
            handleGetAllJokes(res);
        }
        return;
    }
    
    if (path === "/api/jokes" && method === "POST") {
        handleAddJoke(req, res);
        return;
    }

    if (path === "/api/jokes" && (method === "PUT" || method === "DELETE")) {
        let body = "";
        req.on("data", chunk => body += chunk);
        req.on("end", () => {
            let parsed;
            try {
                parsed = JSON.parse(body);
            } catch (e) {
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ success: false, error: "Invalid JSON" }));
                return;
            }

            const id = Number(parsed.id);
            if (!id || isNaN(id)) {
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ success: false, error: "Invalid ID" }));
                return;
            }

            if (method === "PUT") {
                req.body = parsed;
                handleUpdateJoke(id, req, res);
            } else {
                handleDeleteJoke(id, res);
            }
        });
        return;
    }

    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ success: false, error: "Not Found" }));
}

// DO NOT MODIFY THIS module.exports STATEMENT
module.exports = {
    handleRequest
};
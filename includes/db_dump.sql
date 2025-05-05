CREATE DATABASE IF NOT EXISTS jokes_db;
USE jokes_db;

CREATE TABLE IF NOT EXISTS jokes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT NOT NULL,
    author VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert some sample jokes
INSERT INTO jokes (content, author) VALUES
    ("Why do programmers prefer dark mode? Because light attracts bugs!", "John Doe"),
    ("Why do Java developers wear glasses? Because they can\'t C#.", "Jane Doe");


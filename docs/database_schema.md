# Database Schema Design - WuXing Oracle

## 1. Users Table (`users`)
Stores user account information.

| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | UUID / INT (PK) | Unique identifier for the user. |
| `email` | VARCHAR(255) | User's email address (unique). |
| `password_hash` | VARCHAR(255) | Hashed password for security. |
| `is_vip` | BOOLEAN | VIP status (unlimited access). |
| `created_at` | TIMESTAMP | Account creation date. |
| `last_login_at` | TIMESTAMP | Last login timestamp. |
| `last_login_ip` | VARCHAR(45) | IP address of the last login. |

## 2. Readings Table (`readings`)
Stores history of fortune calculations.

| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | UUID / INT (PK) | Unique identifier for the record. |
| `user_id` | UUID / INT (FK) | Reference to the `users` table. |
| `bazi_data` | JSON | Encrypted or structured Ganzhi data (Year/Month/Day/Hour). |
| `wuxing_scores` | JSON | Scores for Wood, Fire, Earth, Metal, Water. |
| `ai_report` | TEXT | The generated interpretation/insight report. |
| `created_at` | TIMESTAMP | When the calculation was performed. |

## 3. Ad Logs Table (`ad_logs`)
Optional table to track ad views for next-day access unlocking.

| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | UUID (PK) | Unique identifier. |
| `user_id` | UUID (FK) | Reference to user. |
| `ad_type` | VARCHAR(50) | e.g., 'rewarded_video'. |
| `unlocked_for_date` | DATE | The date for which access was unlocked. |
| `created_at` | TIMESTAMP | Timestamp of the ad view. |

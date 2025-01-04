
# Optional Tables for Future Enhancements in CPE Tracker

## Overview
This document outlines the optional tables that can be added to the CPE Tracker database in the future to enhance functionality and user experience. These tables are designed to be modular and can be integrated seamlessly into the existing schema.

---

## 1. Notifications Table
The `notifications` table manages reminders or alerts for users about deadlines, renewals, or upcoming requirements.

### Schema
| **Column Name**       | **Data Type**       | **Description**                                                                                     |
|------------------------|---------------------|-----------------------------------------------------------------------------------------------------|
| `notification_id`     | `INTEGER` (Primary Key, Auto-increment) | Unique identifier for each notification.                                                           |
| `user_id`             | `INTEGER` (Foreign Key)               | References the `user_id` in the `users` table.                                                     |
| `message`             | `TEXT`                                | The content of the notification.                                                                   |
| `status`              | `VARCHAR(50)`                         | Status of the notification (e.g., `sent`, `pending`).                                              |
| `created_at`          | `TIMESTAMP`                           | Date and time the notification was created.                                                        |
| `sent_at`             | `TIMESTAMP` (Nullable)                | Date and time the notification was sent.                                                           |

---

## 2. Audit Logs Table
Tracks changes to records for accountability and debugging.

### Schema
| **Column Name**       | **Data Type**       | **Description**                                                                                     |
|------------------------|---------------------|-----------------------------------------------------------------------------------------------------|
| `log_id`              | `INTEGER` (Primary Key, Auto-increment) | Unique identifier for each log entry.                                                              |
| `user_id`             | `INTEGER` (Nullable, Foreign Key)     | References the `user_id` in the `users` table if applicable.                                        |
| `action`              | `TEXT`                                | Description of the action performed (e.g., `updated credential`).                                   |
| `timestamp`           | `TIMESTAMP`                           | The time when the action occurred.                                                                 |
| `details`             | `TEXT` (Nullable)                     | Additional details about the action.                                                               |

---

## 3. Preferences Table
Stores user-specific settings and configurations.

### Schema
| **Column Name**       | **Data Type**       | **Description**                                                                                     |
|------------------------|---------------------|-----------------------------------------------------------------------------------------------------|
| `preference_id`       | `INTEGER` (Primary Key, Auto-increment) | Unique identifier for each preference setting.                                                     |
| `user_id`             | `INTEGER` (Foreign Key)               | References the `user_id` in the `users` table.                                                     |
| `setting_name`        | `VARCHAR(100)`                         | Name of the setting (e.g., `timezone`, `notification_method`).                                      |
| `setting_value`       | `TEXT`                                | The value of the setting.                                                                           |
| `created_at`          | `TIMESTAMP`                           | Date and time the preference was created.                                                          |
| `updated_at`          | `TIMESTAMP`                           | Date and time the preference was last updated.                                                     |

---

## 4. State-Specific CPE Requirements Table
Tracks variations in CPE requirements by state.

### Schema
| **Column Name**       | **Data Type**       | **Description**                                                                                     |
|------------------------|---------------------|-----------------------------------------------------------------------------------------------------|
| `state_id`            | `INTEGER` (Primary Key, Auto-increment) | Unique identifier for each state.                                                                  |
| `state_name`          | `VARCHAR(100)`                         | Name of the state (e.g., `California`, `Texas`).                                                   |
| `credential_id`       | `INTEGER` (Foreign Key)               | References the `credential_id` in the `credentials` table.                                          |
| `total_credits_required` | `INTEGER`                          | Total CPE credits required for the reporting period.                                               |
| `ethics_credits_required`| `INTEGER`                          | Required ethics credits for the reporting period.                                                  |
| `reporting_period_years` | `INTEGER`                          | The length of the reporting period in years.                                                       |
| `created_at`          | `TIMESTAMP`                           | Date and time the record was created.                                                              |
| `updated_at`          | `TIMESTAMP`                           | Date and time the record was last updated.                                                         |

---

## 5. Reports Table
Tracks and stores generated reports for user reference.

### Schema
| **Column Name**       | **Data Type**       | **Description**                                                                                     |
|------------------------|---------------------|-----------------------------------------------------------------------------------------------------|
| `report_id`           | `INTEGER` (Primary Key, Auto-increment) | Unique identifier for each report.                                                                 |
| `user_id`             | `INTEGER` (Foreign Key)               | References the `user_id` in the `users` table.                                                     |
| `report_type`         | `VARCHAR(50)`                         | Type of report (e.g., `progress`, `summary`).                                                      |
| `created_at`          | `TIMESTAMP`                           | Date and time the report was created.                                                              |
| `data`                | `TEXT`                                | The data or contents of the report in serialized format.                                           |

---

This document captures optional tables for future enhancements in the CPE Tracker application, designed to improve functionality and expand usability.

## 6. Reminders Table
Handles recurring reminders distinct from notifications.

### Schema
| **Column Name**       | **Data Type**       | **Description**                                                                                     |
|------------------------|---------------------|-----------------------------------------------------------------------------------------------------|
| `reminder_id`         | `INTEGER` (Primary Key, Auto-increment) | Unique identifier for each reminder.                                                               |
| `user_id`             | `INTEGER` (Foreign Key)               | References the `user_id` in the `users` table.                                                     |
| `message`             | `TEXT`                                | The content of the reminder.                                                                       |
| `frequency`           | `VARCHAR(50)`                         | Frequency of the reminder (e.g., `daily`, `weekly`).                                               |
| `next_reminder`       | `TIMESTAMP`                           | Timestamp for the next scheduled reminder.                                                         |
| `created_at`          | `TIMESTAMP`                           | Date and time the reminder was created.                                                            |

---

## 7. Emails Table
Logs emails sent to users for communication or marketing purposes.

### Schema
| **Column Name**       | **Data Type**       | **Description**                                                                                     |
|------------------------|---------------------|-----------------------------------------------------------------------------------------------------|
| `email_id`            | `INTEGER` (Primary Key, Auto-increment) | Unique identifier for each email.                                                                  |
| `user_id`             | `INTEGER` (Foreign Key)               | References the `user_id` in the `users` table.                                                     |
| `subject`             | `VARCHAR(255)`                        | Subject of the email.                                                                               |
| `body`                | `TEXT`                                | Body content of the email.                                                                          |
| `status`              | `VARCHAR(50)`                         | Status of the email (e.g., `sent`, `pending`, `failed`).                                           |
| `sent_at`             | `TIMESTAMP` (Nullable)                | Date and time the email was sent.                                                                  |

---

## 8. Activity Logs Table
Tracks user interactions with the application for analytics or debugging.

### Schema
| **Column Name**       | **Data Type**       | **Description**                                                                                     |
|------------------------|---------------------|-----------------------------------------------------------------------------------------------------|
| `activity_log_id`     | `INTEGER` (Primary Key, Auto-increment) | Unique identifier for each activity log.                                                           |
| `user_id`             | `INTEGER` (Nullable, Foreign Key)     | References the `user_id` in the `users` table.                                                     |
| `action`              | `TEXT`                                | Description of the user action (e.g., `logged in`, `updated profile`).                             |
| `timestamp`           | `TIMESTAMP`                           | Date and time the activity occurred.                                                               |

---

## 9. Task Queue Table
Manages and tracks background processes or jobs.

### Schema
| **Column Name**       | **Data Type**       | **Description**                                                                                     |
|------------------------|---------------------|-----------------------------------------------------------------------------------------------------|
| `task_id`             | `INTEGER` (Primary Key, Auto-increment) | Unique identifier for each task.                                                                   |
| `task_name`           | `VARCHAR(255)`                        | Name or description of the task.                                                                   |
| `status`              | `VARCHAR(50)`                         | Status of the task (e.g., `pending`, `in progress`, `completed`).                                  |
| `scheduled_at`        | `TIMESTAMP`                           | Date and time the task is scheduled to run.                                                        |
| `completed_at`        | `TIMESTAMP` (Nullable)                | Date and time the task was completed.                                                              |

---

## 10. Custom Fields Table
Allows administrators to define additional user or credential fields dynamically.

### Schema
| **Column Name**       | **Data Type**       | **Description**                                                                                     |
|------------------------|---------------------|-----------------------------------------------------------------------------------------------------|
| `custom_field_id`     | `INTEGER` (Primary Key, Auto-increment) | Unique identifier for each custom field.                                                           |
| `entity`              | `VARCHAR(50)`                         | Entity the field applies to (e.g., `user`, `credential`).                                           |
| `field_name`          | `VARCHAR(100)`                         | Name of the custom field.                                                                           |
| `field_type`          | `VARCHAR(50)`                         | Data type of the custom field (e.g., `text`, `integer`).                                            |
| `created_at`          | `TIMESTAMP`                           | Date and time the custom field was created.                                                        |

---

This extended document now includes all optional tables discussed. Let me know if additional edits or adjustments are needed!

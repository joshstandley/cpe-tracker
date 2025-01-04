
# Database Design for CPE Tracker

## Overview
The database design for the CPE Tracker web application is structured to support scalable and adaptable features while maintaining flexibility for future enhancements. The database includes key tables to manage users, track CPE credits, manage credentials, and generate reports.

---

## Required Tables

### 1. Users Table
The `users` table stores information about the individuals using the application, including their credentials and activity status.

#### Schema
| **Column Name**          | **Data Type**      | **Description**                                                                                     |
|---------------------------|--------------------|-----------------------------------------------------------------------------------------------------|
| `user_id`                | `INTEGER` (Primary Key, Auto-increment) | Unique identifier for each user.                                                                   |
| `email`                  | `VARCHAR(255)` (Unique)                | User's email address for login and communication.                                                  |
| `password_hash`          | `VARCHAR(255)` (Nullable)              | Encrypted/hashed password. Nullable for users who sign up via OAuth.                               |
| `oauth_provider`         | `VARCHAR(50)`                          | OAuth provider used for sign-up (e.g., `gmail`, `outlook`, `none`).                                |
| `oauth_provider_id`      | `VARCHAR(255)`                         | Unique ID provided by the OAuth provider for the user.                                             |
| `first_name`             | `VARCHAR(100)`                         | User's first name.                                                                                 |
| `last_name`              | `VARCHAR(100)`                         | User's last name.                                                                                  |
| `profile_picture_url`    | `VARCHAR(255)` (Nullable)              | URL to the user's profile picture.                                                                 |
| `password_reset_token`   | `VARCHAR(255)` (Nullable)              | Token generated for password reset requests.                                                       |
| `password_reset_expires_at` | `TIMESTAMP` (Nullable)              | Expiry timestamp for the password reset token.                                                     |
| `last_login`             | `TIMESTAMP` (Nullable)                 | Timestamp of the user's last login.                                                                |
| `created_at`             | `TIMESTAMP`                            | Date and time the account was created.                                                             |
| `updated_at`             | `TIMESTAMP`                            | Date and time the account was last updated.                                                        |
| `role`                   | `VARCHAR(50)`                          | User role (e.g., `admin`, `standard_user`).                                                        |
| `status`                 | `VARCHAR(50)`                          | Account status (e.g., `active`, `inactive`, `suspended`).                                          |

### 2. Credentials Table
The `credentials` table defines professional credentials (e.g., CPA, EA) with their requirements and associated details.

#### Schema
| **Column Name**          | **Data Type**       | **Description**                                                                                      |
|---------------------------|---------------------|------------------------------------------------------------------------------------------------------|
| `credential_id`          | `INTEGER` (Primary Key, Auto-increment) | Unique identifier for each credential.                                                              |
| `abbreviation`           | `VARCHAR(50)`                         | Abbreviation for the credential (e.g., `cpa`, `ea`).                                                |
| `full_name`              | `VARCHAR(255)`                        | Full name of the credential (e.g., `Certified Public Accountant`, `Enrolled Agent`).                |
| `description`            | `TEXT` (Nullable)                     | Detailed description of the credential.                                                             |
| `organization_id`        | `INTEGER` (Foreign Key)               | References the `organization_id` in the `organizations` table to link credentials to governing bodies. |
| `website`                | `VARCHAR(255)`                        | URL to the issuing organization’s website.                                                          |
| `min_credits_per_year`   | `INTEGER`                             | Minimum credits required per year for maintaining the credential.                                   |
| `renewal_cycle_years`    | `INTEGER`                             | Number of years in the renewal cycle (e.g., `1` for annual, `3` for triennial).                     |
| `total_credits_per_cycle` | `INTEGER`                            | Total credits required for a full renewal cycle.                                                    |
| `requires_ethics`        | `BOOLEAN`                             | Whether the credential requires ethics credits (`TRUE` or `FALSE`).                                 |
| `other_requirements`     | `TEXT` (Nullable)                     | Additional requirements or notes for the credential.                                                |
| `created_at`             | `TIMESTAMP`                           | Date and time the credential was created in the system.                                             |
| `updated_at`             | `TIMESTAMP`                           | Date and time the credential was last updated.                                                      |

### 3. CPE Types Table
The `cpe_types` table defines categories of continuing professional education (CPE) credits, such as ethics or taxation.

#### Schema
| **Column Name**   | **Data Type**       | **Description**                                                                                     |
|--------------------|---------------------|-----------------------------------------------------------------------------------------------------|
| `cpe_type_id`     | `INTEGER` (Primary Key, Auto-increment) | Unique identifier for each CPE type.                                                               |
| `name`            | `VARCHAR(100)`                         | Name of the CPE type (e.g., `ethics`, `taxation`, `general`).                                       |
| `description`     | `TEXT` (Nullable)                     | Detailed description of the CPE type.                                                              |
| `created_at`      | `TIMESTAMP`                            | Date and time the CPE type was created.                                                            |
| `updated_at`      | `TIMESTAMP`                            | Date and time the CPE type was last updated.                                                       |

### 4. Credential-CPE Types Table
The `credential_cpe_types` table tracks the specific CPE requirements for each credential.

#### Schema
| **Column Name**       | **Data Type**       | **Description**                                                                                     |
|------------------------|---------------------|-----------------------------------------------------------------------------------------------------|
| `credential_cpe_id`   | `INTEGER` (Primary Key, Auto-increment) | Unique identifier for this relationship.                                                           |
| `credential_id`       | `INTEGER` (Foreign Key)               | References the `credential_id` in the `credentials` table.                                          |
| `cpe_type_id`         | `INTEGER` (Foreign Key)               | References the `cpe_type_id` in the `cpe_types` table.                                              |
| `required_credits`    | `INTEGER`                             | Number of credits required for this CPE type under the given credential.                            |
| `created_at`          | `TIMESTAMP`                           | Date and time the relationship was created.                                                        |
| `updated_at`          | `TIMESTAMP`                           | Date and time the relationship was last updated.                                                   |

### 5. CPE Activities Table
The `cpe_activities` table tracks details of individual CPE activities completed by users.

#### Schema
| **Column Name**       | **Data Type**       | **Description**                                                                                     |
|------------------------|---------------------|-----------------------------------------------------------------------------------------------------|
| `activity_id`         | `INTEGER` (Primary Key, Auto-increment) | Unique identifier for each CPE activity.                                                           |
| `user_id`             | `INTEGER` (Foreign Key)               | References the `user_id` in the `users` table.                                                     |
| `title`               | `VARCHAR(255)`                        | Title of the CPE activity.                                                                          |
| `date`                | `DATE`                                | Date when the activity was completed.                                                              |
| `provider`            | `VARCHAR(255)`                        | Provider of the CPE activity.                                                                      |
| `credit_hours`        | `NUMERIC`                             | Number of credit hours awarded for the activity.                                                   |
| `cpe_type_id`         | `INTEGER` (Foreign Key)               | References the `cpe_type_id` in the `cpe_types` table.                                              |
| `credential_id`       | `INTEGER` (Nullable, Foreign Key)     | References the `credential_id` in the `credentials` table if applicable to one specific credential. |
| `created_at`          | `TIMESTAMP`                           | Date and time the activity was recorded.                                                           |
| `updated_at`          | `TIMESTAMP`                           | Date and time the activity was last updated.                                                       |

### 6. Organizations Table
The `organizations` table stores information about the governing bodies that issue credentials.

#### Schema
| **Column Name**       | **Data Type**       | **Description**                                                                                     |
|------------------------|---------------------|-----------------------------------------------------------------------------------------------------|
| `organization_id`     | `INTEGER` (Primary Key, Auto-increment) | Unique identifier for each organization.                                                           |
| `name`                | `VARCHAR(255)`                        | Name of the organization (e.g., `aicpa`, `irs`).                                                   |
| `website`             | `VARCHAR(255)`                        | URL of the organization’s website.                                                                 |
| `contact_info`        | `TEXT` (Nullable)                     | Contact information for the organization.                                                          |
| `created_at`          | `TIMESTAMP`                           | Date and time the organization was created.                                                        |
| `updated_at`          | `TIMESTAMP`                           | Date and time the organization was last updated.                                                   |

---

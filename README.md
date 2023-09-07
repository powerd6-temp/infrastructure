# powerd6/infrastructure

The shared infrastructure for the powerd6 project.

This repository includes all necessary configurations to set-up the project's infrastructure, including external service providers.


## Tech Stack

- **Tools:**
  - Pulumi

- **Managed Services:**
  - Github
    - Organization
    - Repositories
    - Pages
  - Gandi.net
    - Domains
    - DNS
    - Email


## Required access:

### Github
- Organization permissions
  - Read and Write access to:
    - members
    - organization administration
    - organization projects
- Repository permissions
  - Read access to:
    - metadata
  - Read and Write access to:
    - administration
     - code
     - issues
### Gandi.net
This provider uses a (deprecated) API key: https://account.gandi.net/
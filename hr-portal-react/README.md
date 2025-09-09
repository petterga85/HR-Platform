# HR Portal (React + Vite)

A secure, responsive HR portal featuring:
- User authentication (login & signup)
- Role-based access control (HR vs Employee)
- Employee profile management (HR + Employee self-service)
- Leave request submission and HR approval workflow
- JSON persistence via `localStorage`
- Responsive UI and simple themed CSS

## Quick Start

```bash
# 1) Extract and install
npm install

# 2) Run dev server
npm run dev

# 3) Open the URL shown in the terminal
```

### Seeded HR account
- Email: `hr@company.com`
- Password: `password`

### Notes
- This demo uses client-side JSON storage (`localStorage`) only. Replace with real APIs for production.
- Authentication is a demo (plain-text passwords). Use a proper backend with hashing and sessions/JWT for production.

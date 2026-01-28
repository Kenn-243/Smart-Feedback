## Feedback Management System

A modern feedback management application built with Next.js 15 that leverages AI-powered categorization through n8n workflow automation and Supabase for data management.

## Features

- **AI-Powered Categorization**: Automatic feedback classification using Hugging Face's zero-shot classification model
- **Automated Workflow**: n8n integration for seamless feedback processing pipeline
- **Real-time Updates**: Automatic status and priority assignment based on AI analysis

## Tech Stack

- **Frontend**: Next.js 15
- **Runtime**: Node.js 23.3.0
- **Database**: Supabase (PostgreSQL)
- **Automation**: n8n Workflow Engine
- **AI/ML**: Hugging Face Zero-Shot Classification

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js version 23.3.0
- npm, yarn, pnpm, or bun package manager
- Supabase account with a configured project
- n8n instance (local or cloud)

## Getting Started

### Installation

1. Clone the repository:

```bash
git clone
cd
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables (create a `.env.local` file):

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
# Add other required environment variables
```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## n8n Workflow

The automated feedback processing workflow consists of the following stages:

### Workflow Overview

![Successful Workflow](workflow.png)

### Processing Pipeline

1. **Trigger**: Workflow is initiated when new feedback is inserted into Supabase
2. **Data Retrieval**: Fetches the newly inserted feedback
3. **AI Classification**: Processes descriptions through Hugging Face's zero-shot classification model
   - Categories: `urgent`, `broken`, `error`, `neither`
4. **Code Parser Node**: Applies business logic based on AI classification
   - **If classified as "neither"**:
     - Category: `General`
     - Priority: `Low`
   - **Otherwise** (`urgent`, `broken`, or `error`):
     - Category: `Bug`
     - Priority: `High`
   - Status: Updated to `Processed` for all classifications
5. **Database Update**: Automatically updates Supabase with processed feedback data

### Performance Notes

- **Processing Time**: Typically 1-6 minutes per feedback item
- **Known Limitations**: Occasional runtime errors may occur during high-demand periods on Hugging Face servers
- **Alternative Options**: OpenAI integration or If/Else node logic can provide faster processing if constraints allow

## Database Security

## RLS Policy

![RLS Policy](rls.png)

The application implements the following security policies:

#### 1. Authenticated Insert Only

```sql
-- Enable insert for authenticated users only
```

**Rationale**: Ensures only logged-in users can submit feedback, preventing anonymous spam and maintaining accountability.

#### 2. User-Specific Insert

```sql
-- Enable insert for users based on user_id
```

**Rationale**: Associates each feedback submission with the authenticated user's ID, enabling individual tracking and ownership.

#### 3. Personal Data Access

```sql
-- Enable users to view their own data only
```

**Rationale**: Restricts data visibility to the submitting user, ensuring privacy and data isolation in a multi-user environment.

### Security Assumptions

- Each user operates independently (individual access model)
- Feedback submissions are personal and not shared across teams
- Users should only access their own submitted feedback

## Project Structure

```
├── src/                  # Next.js 15 app directory
   ├── lib/               # Utility functions and configurations
├── components/           # React components
├── public/               # Static assets
├── interfaces/           # Interfaces
├── services/             # APIs
└── README.md             # Project documentation
```

## Configuration

### Supabase Setup

1. Create a new Supabase project
2. Set up the `feedback` table with the following schema:
   - `id` (uuid, primary key)
   - `user_id` (uuid, foreign key)
   - `description` (text)
   - `category` (text)
   - `priority` (text)
   - `status` (text)
   - `created_at` (timestamp)

3. Enable RLS policies as described in the security section

### n8n Configuration

1. Import the workflow from the provided JSON/workflow file
2. Configure Supabase credentials in n8n
3. Set up Hugging Face API token
4. Test the workflow with sample data

## Troubleshooting

### Common Issues

**Workflow Processing Delays**

- The AI classification may take 1-6 minutes due to Hugging Face server load
- Consider implementing a queue system for high-volume scenarios

**Runtime Errors**

- Hugging Face API may return errors during peak demand
- Implement retry logic or fallback classification methods

**RLS Policy Issues**

- Ensure users are properly authenticated before inserting data
- Verify `user_id` is correctly set in the session

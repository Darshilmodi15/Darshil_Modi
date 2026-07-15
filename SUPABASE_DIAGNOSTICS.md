# Supabase diagnostics

The admin dashboard already reads from `contact_messages` and `visitors`. If the dashboard shows new data but the Supabase Table Editor appears empty, the most likely issue is a project, branch, schema, filter, or dashboard visibility mismatch rather than a failed insert.

## Protected diagnostic endpoint

After logging into Mission Control, open:

```txt
/ api / mission-control / supabase-diagnostics
```

Actual path without spaces:

```txt
/api/mission-control/supabase-diagnostics
```

It returns only safe server-side information:

- Supabase project reference derived from `SUPABASE_URL`
- Supabase URL host
- Whether `contact_messages` can be queried
- Whether `visitors` can be queried
- Latest `created_at` timestamp from each table
- Number of returned records
- Sanitized Supabase error code/message, if any

It never returns or logs the secret key.

## How to compare project references

1. In Vercel, check `SUPABASE_URL`. It usually looks like:

```txt
https://abcdefghijklmnopqrst.supabase.co
```

2. The project reference is the first hostname segment:

```txt
abcdefghijklmnopqrst
```

3. Open your Supabase dashboard. The browser URL usually contains the project ref:

```txt
https://supabase.com/dashboard/project/abcdefghijklmnopqrst/...
```

4. Confirm that the dashboard project ref exactly matches the ref from `SUPABASE_URL`.

5. In Table Editor, also check:

- You are viewing the `public` schema.
- No filters are hiding rows.
- You are not looking at another branch or preview database.
- You are checking the same project used by Vercel production environment variables.

If the diagnostic endpoint shows recent timestamps but the Table Editor does not, the app is connected and the mismatch is in the dashboard view/project/branch.

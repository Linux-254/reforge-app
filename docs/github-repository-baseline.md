# ReForge GitHub repository baseline

The ReForge source baseline is hosted in the private repository [Linux-254/reforge](https://github.com/Linux-254/reforge). The GitHub API confirmed the repository name is `reforge`, visibility is `private`, and the default branch is `features`.

The local `features` branch and the remote `features` ref both point to commit `48190cf23f9f7e7b7b49d1bde9d0373bca54d024`, which contains the latest source-control baseline including responsive verification notes and the Supabase Auth migration preparation roadmap. The existing Manus project remote remains available independently for checkpoint and rollback workflows.

This repository is a source-control baseline only. Supabase Auth migration work must be staged separately and must not replace the current Manus authentication flow until redirect, session, RBAC, encryption, supporter-consent, and rollback checks pass.

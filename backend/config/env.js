import dotenv from "dotenv";

// Resolve from this module so commands work from any directory.
dotenv.config({ path: new URL("../../.env", import.meta.url) });

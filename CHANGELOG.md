# New update v0.0.2

Changes:
- User input validation errors will be sended to user as object in this schema `{ [field]: [message] }`.
- Removed authentication from `getAllProjects` route.

Added:
- README.md
- Token refresh veryfication in `getAllProjects` route function.
- Utility function that collect all valdation errors to the one object.
- Generic type in `verifyJWTToken` utility function jet extends form `JwtPayload` type.

Fixed:
- Types definitions.
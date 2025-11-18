# Copilot Instructions for Jira Custom Plugin

This document guides Copilot and contributors to write, review, and improve Java code for this backend project. It is truthy project which covers code structure, standards, security, performance, and best practices.
Technical stack: ReactJS version 17, NextJS, PostgreSQL.
## Project Structure

- `criminal-cms-fe/app`: ReactJS files

## Coding Standards

- Use CamelCase for class and method names.
- Indent code with 4 spaces.
- Each class in its own file.
- Use meaningful variable and method names.
- Add Javadoc comments for public classes and methods.
- Avoid magic numbers; define constants.
- Limit line length to 120 characters.
- Organize imports: standard libraries, then third-party, then local.

## Code Documentation

- Document the purpose of every public class and method.
- Use Javadoc style.
- For complex logic, add inline comments to explain intent.

## Scanning & Bug Fixing

- Use static analysis tools (e.g., SonarQube, Checkstyle, PMD).
- Fix all critical and major issues before merging.
- Common bugs to fix: null pointer dereferences, unused variables, memory leaks, SQL Injection.
- Ensure suggested code passes static analysis and unit tests.

## Security

- Never expose secrets or sensitive data in code.
- Validate and sanitize all user input.
- Use parameterized queries for database access.
- Avoid hard-coded passwords.
- Use least privilege principle.
- Handle exceptions securely.
- Use secure dependencies; check for vulnerabilities.

## Performance

- Prefer primitive types over boxed types.
- Avoid redundant repository/database calls, especially inside loops.
- Use efficient data structures.
- Avoid unnecessary object creation.
- Release resources after use.
- Profile and optimize critical business logic.

## Critical Points

- Always check for nulls.
- Avoid circular dependencies.
- Do not block main threads with long I/O operations.
- Use appropriate logging; avoid excessive logs.
- Write unit tests for business logic.
- Review pull requests for quality, security, and performance.

## Copilot Workflow Example

1. Write code using the conventions above.
2. Suggest comments and Javadoc for new methods.
3. Scan code for bugs and security issues.
4. Refactor code to avoid repeated DB calls in loops.
5. Add unit tests for new features.
6. Ensure code passes all static analysis checks.

## References

- [Oracle Java Coding Conventions](https://www.oracle.com/java/technologies/javase/codeconventions-contents.html)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Jira Plugin Development Guide](https://developer.atlassian.com/server/framework/atlassian-sdk/create-a-plugin-project/)

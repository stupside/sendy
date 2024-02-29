# Fastack

Fastack is a versatile project template meticulously designed for proof-of-concept applications, harnessing the capabilities of Fastify, RemixJS, and Rollup.

**Note:** Ensure PNPM is used instead of NPM.

## Dependencies

### Frontend

| Dependency  | npm Package                                                  |
| ----------- | ------------------------------------------------------------ |
| RemixJS     | [Remix](https://www.npmjs.com/package/remix)                 |
| TailwindCSS | [Tailwind CSS](https://www.npmjs.com/package/tailwindcss)    |
| Heroicons   | [Heroicons](https://www.npmjs.com/package/heroicons)         |
| HeadlessUI  | [Headless UI](https://www.npmjs.com/package/@headlessui/vue) |

### Backend

| Dependency | npm Package                                      |
| ---------- | ------------------------------------------------ |
| Fastify    | [Fastify](https://www.npmjs.com/package/fastify) |
| Prisma ORM | [Prisma](https://www.npmjs.com/package/prisma)   |
| Redis      | [Redis](https://www.npmjs.com/package/redis)     |

### Type Safety

| Dependency | npm Package                                      |
| ---------- | ------------------------------------------------ |
| AJV        | [AJV](https://www.npmjs.com/package/ajv)         |
| TypeBox    | [TypeBox](https://www.npmjs.com/package/typebox) |

### Build and Tooling

| Dependency | npm Package                                    |
| ---------- | ---------------------------------------------- |
| Rollup     | [Rollup](https://www.npmjs.com/package/rollup) |
| PNPM       | [PNPM](https://www.npmjs.com/package/pnpm)     |

## Project Structure

The project is meticulously organized into distinct folders, providing a well-structured and efficient foundation for developing both frontend and backend components of your applications.

### Apps

The `apps` folder encapsulates the source code for both the backend and frontend applications. Consult their respective README files for a seamless initiation.

### Packages

Explore the `packages` folder, where custom Rollup packages can be effortlessly created and integrated into your project.

### Frontend

The frontend boasts an array of pre-configured features:

#### Routing

Seamless integration with TailwindCSS for a streamlined styling experience.

#### Security

Auth Token is securely hidden in a cookie during Server-Side Rendering (SSR).

#### Design

Out-of-the-box integration with Heroicons and HeadlessUI for elevated user interface components.

### Backend

The backend is fortified with essential features:

#### Database Connection

Leverages the Prisma ORM for efficient and scalable database interactions.

#### Schema Validations

Utilizes AJV, TypeBox, and OpenAPI with Swagger for robust schema validations.

#### Security

Implements Cors Policies for secure cross-origin resource sharing.

Enforces fine-grained claims for precise control over user permissions.

Generates JWT Tokens and includes a Bearer authentication middleware for heightened security.

#### Commons

Provides a Server-Sent Events (SSE) endpoint using Redis Pub-Sub for real-time communication.

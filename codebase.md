# vite.config.ts

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})

```

# tsconfig.node.json

```json
{
  "compilerOptions": {
    "composite": true,
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "noEmit": true
  },
  "include": ["vite.config.ts"]
}

```

# tsconfig.json

```json
{
  "files": [],
  "references": [
    {
      "path": "./tsconfig.app.json"
    },
    {
      "path": "./tsconfig.node.json"
    }
  ]
}

```

# tsconfig.app.json

```json
{
  "compilerOptions": {
    "composite": true,
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}

```

# tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
}


```

# postcss.config.js

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

```

# package.json

```json
{
  "name": "redux-store-poc",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "dependencies": {
    "@reduxjs/toolkit": "^2.2.7",
    "axios": "^1.7.3",
    "lucide-react": "^0.424.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-redux": "^9.1.2"
  },
  "devDependencies": {
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@typescript-eslint/eslint-plugin": "^7.15.0",
    "@typescript-eslint/parser": "^7.15.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.20",
    "eslint": "^8.57.0",
    "eslint-plugin-react-hooks": "^4.6.2",
    "eslint-plugin-react-refresh": "^0.4.7",
    "postcss": "^8.4.41",
    "tailwindcss": "^3.4.7",
    "typescript": "^5.2.2",
    "vite": "^5.3.4"
  }
}

```

# index.html

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React + TS</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

```

# README.md

```md
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

\`\`\`js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json', './tsconfig.app.json'],
    tsconfigRootDir: __dirname,
  },
}
\`\`\`

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

```

# .gitignore

```
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

```

# .eslintrc.cjs

```cjs
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}

```

# public/vite.svg

This is a file of the type: SVG Image

# src/vite-env.d.ts

```ts
/// <reference types="vite/client" />

```

# src/main.tsx

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./stores/index";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

```

# src/index.css

```css
:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}
a:hover {
  color: #535bf2;
}

body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }
  a:hover {
    color: #747bff;
  }
  button {
    background-color: #f9f9f9;
  }
}

```

# src/App.tsx

```tsx
import { useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./stores/index";
import { ConversationStore } from "./stores//conversationStore";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const conversations = useSelector((state: RootState) =>
    ConversationStore.selectors.selectAll(state)
  );

  useEffect(() => {
    dispatch(ConversationStore.actions.fetchAll());
  }, [dispatch]);

  return (
    <div>
      <h2>Conversations</h2>
      <ul>
        {conversations.map((conversation) => (
          <li key={conversation.id}>
            <h3>{conversation.title}</h3>
            <p>{conversation.lastMessage}</p>
            <small>{conversation.timestamp}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

```

# src/App.css

```css
#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.react:hover {
  filter: drop-shadow(0 0 2em #61dafbaa);
}

@keyframes logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: no-preference) {
  a:nth-of-type(2) .logo {
    animation: logo-spin infinite 20s linear;
  }
}

.card {
  padding: 2em;
}

.read-the-docs {
  color: #888;
}

```

# src/stores/index.ts

```ts
import { configureStore } from "@reduxjs/toolkit";
import { ConversationStore } from "./conversationStore";

export const store = configureStore({
  reducer: {
    conversations: ConversationStore.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

```

# src/stores/conversationStore.ts

```ts
import { createBaseStore } from "./baseStore";

export interface Conversation {
  id: number;
  title: string;
  lastMessage: string;
  timestamp: string;
}

export const ConversationStore = createBaseStore<Conversation>(
  "conversations",
  "conversations",
  { apiVersion: "v1" }
);

```

# src/stores/baseStore.ts

```ts
// src/store/baseStore.ts
import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  SerializedError,
} from "@reduxjs/toolkit";
import { ApiClient } from "./ApiClient";

interface BaseModel {
  id: string | number;
  [key: string]: any;
}

interface BaseState<T extends BaseModel> {
  records: Record<string | number, T>;
  loading: boolean;
  error: SerializedError | null;
}

export function createBaseStore<T extends BaseModel>(
  name: string,
  resource: string,
  apiOptions = {}
) {
  const apiClient = new ApiClient(resource, apiOptions);

  const initialState: BaseState<T> = {
    records: {},
    loading: false,
    error: null,
  };

  const fetchAll = createAsyncThunk<
    T[],
    void,
    { rejectValue: SerializedError }
  >(`${name}/fetchAll`, async (_, { rejectWithValue }) => {
    try {
      const { data } = await apiClient.get();
      const { payload } = data.data;

      return payload;
    } catch (err: any) {
      return rejectWithValue({
        name: "FetchError",
        message: err.message || "Failed to fetch data",
      });
    }
  });

  const create = createAsyncThunk<
    T,
    Partial<T>,
    { rejectValue: SerializedError }
  >(`${name}/create`, async (data, { rejectWithValue }) => {
    try {
      const response = await apiClient.create(data);
      return response.data;
    } catch (err: any) {
      return rejectWithValue({
        name: "CreateError",
        message: err.message || "Failed to create item",
      });
    }
  });

  const update = createAsyncThunk<
    T,
    { id: string | number; data: Partial<T> },
    { rejectValue: SerializedError }
  >(`${name}/update`, async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await apiClient.update(id, data);
      return response.data;
    } catch (err: any) {
      return rejectWithValue({
        name: "UpdateError",
        message: err.message || "Failed to update item",
      });
    }
  });

  const remove = createAsyncThunk<
    string | number,
    string | number,
    { rejectValue: SerializedError }
  >(`${name}/remove`, async (id, { rejectWithValue }) => {
    try {
      await apiClient.delete(id);
      return id;
    } catch (err: any) {
      return rejectWithValue({
        name: "DeleteError",
        message: err.message || "Failed to delete item",
      });
    }
  });

  const slice = createSlice({
    name,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchAll.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchAll.fulfilled, (state, action) => {
          state.loading = false;
          state.records = action.payload.reduce((acc, item) => {
            acc[item.id] = item;
            return acc;
          }, {} as Record<string | number, T>);
        })
        .addCase(fetchAll.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || action.error;
        })
        .addCase(create.fulfilled, (state, action) => {
          state.records[action.payload.id] = action.payload;
        })
        .addCase(update.fulfilled, (state, action) => {
          state.records[action.payload.id] = action.payload;
        })
        .addCase(remove.fulfilled, (state, action) => {
          delete state.records[action.payload];
        });
    },
  });

  const selectAll = (state: { [key: string]: BaseState<T> }) =>
    Object.values(state[name].records);
  const selectById = (
    state: { [key: string]: BaseState<T> },
    id: string | number
  ) => state[name].records[id];
  const selectLoading = (state: { [key: string]: BaseState<T> }) =>
    state[name].loading;
  const selectError = (state: { [key: string]: BaseState<T> }) =>
    state[name].error;

  return {
    reducer: slice.reducer,
    actions: {
      ...slice.actions,
      fetchAll,
      create,
      update,
      remove,
    },
    selectors: {
      selectAll,
      selectById,
      selectLoading,
      selectError,
    },
  };
}

```

# src/stores/ApiClient.ts

```ts
import axios, { AxiosInstance } from "axios";

const DEFAULT_API_VERSION = "v1";

export class ApiClient {
  private axiosInstance: AxiosInstance;

  constructor(
    resource: string,
    options: { apiVersion?: string; enterprise?: boolean } = {}
  ) {
    const apiVersion = options.apiVersion || DEFAULT_API_VERSION;
    let baseURL = `/api/${apiVersion}/${resource}`;

    if (options.enterprise) {
      baseURL = `/enterprise${baseURL}`;
    }

    this.axiosInstance = axios.create({ baseURL });
  }

  async get() {
    // return this.axiosInstance.get("");
    return this.axiosInstance.get("https://api.npoint.io/c0a39d00b2e850b4bee9");
  }

  async show(id: string | number) {
    return this.axiosInstance.get(`/${id}`);
  }

  async create(data: any) {
    return this.axiosInstance.post("", data);
  }

  async update(id: string | number, data: any) {
    return this.axiosInstance.patch(`/${id}`, data);
  }

  async delete(id: string | number) {
    return this.axiosInstance.delete(`/${id}`);
  }
}

```

# src/assets/react.svg

This is a file of the type: SVG Image


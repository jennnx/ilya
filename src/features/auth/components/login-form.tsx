import { validatedFetch } from "@/utils/response";
import { loginResponseSchema } from "../types";
import { createSignal, createResource, Show } from "solid-js";

export default function LoginForm() {
  const [error, setError] = createSignal<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    const [response, data] = await validatedFetch(
      "/api/login",
      loginResponseSchema,
      {
        method: "POST",
        body: formData,
        redirect: "follow",
      },
    );
    if (response.ok) {
      window.location.href = "/";
    } else {
      setError(data.message || "Login Error");
    }
  };

  return (
    <form
      class="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(new FormData(e.target as HTMLFormElement));
      }}
    >
      <div class="relative -space-y-px rounded-md shadow-sm">
        <div class="pointer-events-none absolute inset-0 z-10 rounded-md ring-1 ring-inset ring-gray-300"></div>
        <div>
          <label for="username" class="sr-only">
            {" "}
            Username{" "}
          </label>
          <input
            id="username"
            name="username"
            type="text"
            autocomplete="username"
            required
            class="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Username"
          />
        </div>
        <div>
          <label for="password" class="sr-only">
            {" "}
            Password{" "}
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autocomplete="current-password"
            required
            class="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Password"
          />
        </div>
      </div>
      <div>
        <button
          type="submit"
          class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Sign in
        </button>
      </div>
      <Show when={error() != null}>
        <p>{error()}</p>
      </Show>
    </form>
  );
}

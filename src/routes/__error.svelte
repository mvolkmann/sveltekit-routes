<script context="module" lang="ts">
  import type {ErrorLoadInput, LoadOutput} from '@sveltejs/kit';

  export function load({error}: ErrorLoadInput): LoadOutput {
    return {
      props: {message: error.message}
    };
  }
</script>

<script lang="ts">
  export let message: string;
</script>

<h1>An error occurred ...</h1>
<h2>{message}</h2>

<style>
  h2 {
    color: red;
  }
</style>

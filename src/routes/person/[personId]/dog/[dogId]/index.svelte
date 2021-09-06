<script context="module" lang="ts">
  import type {LoadInput, LoadOutput} from '@sveltejs/kit/types';
  import type {Dog} from '$lib/types';

  export async function load({
    context, // not used
    fetch,
    page,
    session // not used
  }: LoadInput): Promise<LoadOutput> {
    const {personId, dogId} = page.params;
    const url = `/api/person/${personId}/dog/${dogId}`;
    const res = await fetch(url);
    let dog: Dog;
    let error = '';

    // Cache the page for the specified personId and dogId for 60 seconds.
    // Any request with the cached values received in that time period
    // will be served a cache page and this load function will not be run.
    let maxage = 60;

    let status = 200;
    if (res.ok) {
      dog = await res.json();
    } else {
      error = await res.text();
      console.log('index.svelte load: error =', error);
      status = res.status;
    }
    return {error, maxage, props: {dog}, status};
  }
</script>

<script lang="ts">
  export let dog: Dog;
</script>

<p>
  {dog.name} is a {dog.breed}.
</p>

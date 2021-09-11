<script context="module" lang="ts">
  import type {LoadInput, LoadOutput} from '@sveltejs/kit';
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
    if (res.ok) {
      const dog = await res.json();
      // Cache the page for the specified personId and dogId for 60 seconds.
      // Any request with the cached values received in that time period
      // will be served a cache page and this load function will not be run.
      return {maxage: 60, props: {dog}};
    }

    const error = await res.text();
    return {error, status: res.status};
  }
</script>

<script lang="ts">
  export let dog: Dog;
</script>

<p>
  {dog.name} is a {dog.breed}.
</p>

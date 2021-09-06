<script lang="ts">
  import {goto, prefetch} from '$app/navigation';
  import {setCursor} from '$lib/util';
  import '../global.css';

  let goToBtn: HTMLButtonElement;
  let dogId = 1;
  let personId = 1;

  let url: string;
  $: url = `/person/${personId}/dog/${dogId}`;

  function fetch() {
    prefetch(url);
  }

  async function submit() {
    setCursor('wait');
    goto(url);
  }
</script>

<form on:submit|preventDefault={submit}>
  <div class="row">
    <label for="person">Person ID</label>
    <input type="number" bind:value={personId} />
  </div>
  <div class="row">
    <label for="dog">Dog ID</label>
    <input type="number" bind:value={dogId} />
  </div>

  <!-- This demonstrations using prefetch on a hyperlink. -->
  <a href={url} sveltekit:prefetch on:click={() => setCursor('wait')}>
    Go To Dog
  </a>

  <!-- This demonstrations using prefetch on a button. -->
  <!-- For accessibility, mouse event handling should have
       corresponding key event handling. This is why we
       listen for both mouseover and focus events here. -->
  <button bind:this={goToBtn} on:focus={fetch} on:mouseover={fetch}>
    Go To dog
  </button>
</form>

<style>
  .row {
    margin-bottom: 0.5rem;
  }
</style>

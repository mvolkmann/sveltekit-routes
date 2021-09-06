<script lang="ts">
  import {goto, prefetch} from '$app/navigation';
  import {navigating} from '$app/stores';
  import {setCursor} from '$lib/util';
  import '../global.css';

  let goToBtn: HTMLButtonElement;

  // Changing either of these will cause prefetch to trigger again
  // if the user hovers over the "Go To Dog" anchor or button.
  let dogId = 1;
  let personId = 1;

  // Changing this will not cause prefetch to trigger again.
  let unusedId = 1;

  let url: string;
  $: url = `/person/${personId}/dog/${dogId}`;

  $: setCursor($navigating ? 'wait' : 'default');

  function fetch() {
    prefetch(url);
  }
</script>

<form on:submit|preventDefault={() => goto(url)}>
  <div class="row">
    <label for="person">Person ID</label>
    <input type="number" bind:value={personId} />
  </div>
  <div class="row">
    <label for="dog">Dog ID</label>
    <input type="number" bind:value={dogId} />
  </div>
  <div class="row">
    <label for="unused">Unused ID</label>
    <input type="number" bind:value={unusedId} />
  </div>

  <!-- This demonstrations using prefetch on a hyperlink. -->
  <a href={url} sveltekit:prefetch> Go To Dog </a>

  <!-- This demonstrations using prefetch on a button. -->
  <!-- For accessibility, mouse event handling should have
       corresponding key event handling. This is why we
       listen for both mouseover and focus events here. -->
  <button bind:this={goToBtn} on:focus={fetch} on:mouseover={fetch}>
    Go To Dog
  </button>
</form>

<style>
  .row {
    margin-bottom: 0.5rem;
  }
</style>

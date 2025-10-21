<script lang="ts">
  let { form } = $props();

  $effect(() => {
    console.log('Form data changed:', form);
  });

	interface Participant {
		name: string;
		email: string;
	}

	let participants: Participant[] = $state([
		{ name: '', email: '' },
		{ name: '', email: '' },
		{ name: '', email: '' }
	]);

	function addParticipant() {
		participants.push({ name: '', email: '' });
	}

	function deleteParticipant(index: number) {
		participants.splice(index, 1);
		while (participants.length < 3) {
			addParticipant();
		}
	}
</script>

<h1>Secret Angel</h1>

<div class="participants-container">
	<form method="POST">

		{#each participants as participant, index (index)}
			<div class="participant">
				<input required name="name" type="text" bind:value={participant.name} placeholder="Name" />
				<input required name="email" type="email" bind:value={participant.email} placeholder="Email" />
				<button type="button" onclick={() => deleteParticipant(index)}>Delete</button>
			</div>
		{/each}

		<button type="button" onclick={addParticipant}>Add Angel</button>

		<button type="submit">Send Emails</button>

	</form>
</div>

<style>
</style>

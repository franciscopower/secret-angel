<script lang="ts">
	let { form } = $props();

	let formStatus = $derived(form?.status || 'idle');

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

{#if formStatus === 'idle' || formStatus === 'error'}
	<div class="participants-container">
		<form method="POST">
			{#if formStatus === 'error'}
				<div class="error-message">Something went wront. Please try again.</div>
			{/if}

			{#each participants as participant, index (index)}
				<div class="participant">
					<input
						required
						name="name"
						type="text"
						bind:value={participant.name}
						placeholder="Name"
					/>
					<input
						required
						name="email"
						type="email"
						bind:value={participant.email}
						placeholder="Email"
					/>
					<button type="button" onclick={() => deleteParticipant(index)}>Delete</button>
				</div>
			{/each}

			<button type="button" onclick={addParticipant}>Add Angel</button>

			<button type="submit">Send Emails</button>
		</form>
	</div>

{:else if formStatus === 'success'}

	<div class="success-message">
		<h2>Emails have been sent.</h2>
		<button onclick={() => (formStatus = 'idle')}>Start Over</button>
	</div>

{/if}

<style>
</style>

<script lang="ts">
	interface Participant {
		name: string;
		email: string;
	}

	let participants: Participant[] = $state([
		{ name: 'Francisco', email: 'franciscopower66@gmail.com' },
		{ name: 'Angelica', email: 'angelicasofiagn@gmail.com' },
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
				<input name="name" type="text" bind:value={participant.name} placeholder="Name" />
				<input name="email" type="email" bind:value={participant.email} placeholder="Email" />
				<button type="button" onclick={() => deleteParticipant(index)}>Delete</button>
			</div>
		{/each}

		<button type="button" onclick={addParticipant}>Add Angel</button>

		<button type="submit">Send Emails</button>

	</form>
</div>

<style>


	h1{
		font-style: italic;
		color:coral;
		display: flex;
		justify-content: center;
	}

	.participants-container{
		 display: flex;
  		 justify-content: center;
		 
		 
	}

	.participants-container input{
		font-size: large;
		background-color: antiquewhite;
		font-style: Monospace;
		
	}

	.participants-container button{
		background-color:burlywood;
		font-size: large;
	}

</style>

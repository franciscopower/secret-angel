<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import Icon from '@iconify/svelte';

	let { form } = $props();

	$effect(() => {
		console.log('Form status changed:', form);
	});

	let formStatus = $derived(form ? (page.status == 200 ? 'success' : 'error') : 'idle');

	const themes = {
		secretAngel: {
			title: 'Become a Secret Angel!',
			error: {
				repeated: 'Oops! There is a repeated name in the list.',
				sendError: 'Oops! There was an issue sending your angelic messages.'
			},
			success: 'Your angelic messages have taken flight!',
			submitButton: 'Deliver Angelic Greetings',
			resetButton: 'Spread More Magic',
			placeholders: {
				name: "Angel's Name",
				email: "Angel's Email"
			}
		},
		secretSanta: {
			title: 'Become a Secret Santa!',
			error: {
				repeated: 'Oops! There is a repeated name in the list.',
				sendError: 'Oops! There was an issue sending your secret Santa messages.'
			},
			success: 'Your festive messages have been delivered!',
			submitButton: 'Send Festive Greetings',
			resetButton: 'Spread More Holiday Cheer',
			placeholders: {
				name: "Santa's Helper",
				email: "Helper's Email"
			}
		},
		secretFriend: {
			title: 'Become a Secret Friend!',
			error: {
				repeated: 'Oops! There is a repeated name in the list.',
				sendError: 'Oops! There was an issue delivering your secret friend messages.'
			},
			success: 'Your friendly messages have been shared!',
			submitButton: 'Send Friendly Greetings',
			resetButton: 'Make More Friends',
			placeholders: {
				name: "Friend's Name",
				email: "Friend's Email"
			}
		}
	};
	let currentTheme = $state(themes.secretAngel);

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

<h1>{currentTheme.title}</h1>

<div class="theme-switcher">
	<label for="theme-select">Choose a theme:</label>
	<select id="theme-select" bind:value={currentTheme}>
		<option value={themes.secretAngel}>Secret Angel</option>
		<option value={themes.secretSanta}>Secret Santa</option>
		<option value={themes.secretFriend}>Secret Friend</option>
	</select>
</div>

{#if formStatus === 'idle' || formStatus === 'error'}
	<div class="participants-container">
		<form method="POST" use:enhance>
			{#if form?.repeated}
				<div class="error-message">
					<p>{currentTheme.error?.repeated}</p>
				</div>
			{:else if form?.sendError}
				<div class="error-message">
					<p>{currentTheme.error?.sendError}</p>
				</div>
			{/if}

			{#each participants as participant, index (index)}
				<div class="participant">
					<div class="participant-input">
						<input
							required
							name="name"
							type="text"
							bind:value={participant.name}
							placeholder={currentTheme.placeholders?.name}
						/>
						<input
							required
							name="email"
							type="email"
							bind:value={participant.email}
							placeholder={currentTheme.placeholders?.email}
						/>
					</div>
					<button class="delete" type="button" onclick={() => deleteParticipant(index)}>
						<Icon icon="material-symbols:delete-outline-rounded" />
					</button>
				</div>
			{/each}

			<button class="add" type="button" onclick={addParticipant}>
				<Icon icon="material-symbols:add-circle-outline-rounded" />
			</button>

			<div class="submit">
				<button type="submit">{currentTheme.submitButton}</button>
			</div>
		</form>
	</div>
{:else if formStatus === 'success'}
	<div class="success-message">
		<h2>{currentTheme.success}</h2>
		<button onclick={() => (formStatus = 'idle')}>{currentTheme.resetButton}</button>
	</div>
{/if}

<style>
	:root {
		background: linear-gradient(90deg, #b2f2ffff 0%, #bebdf7ff 100%);
	}

  .theme-switcher {
    margin-bottom: 20px;
    margin-left: 10px;
    & select {
      margin-left: 10px;
      padding: 5px;
      border-radius: 4px;
      border: 1px solid rgba(255, 255, 255, 0.3);
      background: rgba(255, 255, 255, 0.4);
    }

    & option {
      background: white;
      border-radius: 4px;
    }
  }


	.participants-container {
		background: rgba(255, 255, 255, 0.3);
		border-radius: 8px;
		padding: 10px;
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		border: 2px solid rgba(255, 255, 255, 0.3);
	}

	.participant {
		display: flex;
		align-items: center;
		margin-bottom: 10px;
		width: 100%;
	}

  .participant-input {
    display: flex;
    width: 100%;

    @media (max-width: 600px) {
      flex-direction: column;
      gap: 10px;
    }
  }
	.participant-input input {
    width: 50%;
		margin-right: 10px;
		padding: 8px;
    border: none;
    border-bottom: 2px solid rgba(255, 255, 255, 0.9);
		border-radius: 4px;
		background: rgba(255, 255, 255, 0.4);
    @media (max-width: 600px) {
      width: calc(100% - 2rem);
      margin-right: 0;
    }
	}

	.delete {
		background: none;
		border: none;
		cursor: pointer;
		color: darkgray;
		font-size: 24px;
		padding: 0;
	}
	.delete:hover {
    color: hsl(0 27% 50% / 100%) ;
	}

  .add {
    background: none;
    border: none;
    cursor: pointer;
    color: darkgray;
    font-size: 32px;
    padding: 0;
    width: fit-content;
    align-self: center;
  }
  .add:hover {
    color: hsl(0 0% 50%) ;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .submit>button {
    display: flex;
    justify-content: center;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 8px;
    padding: 10px;
    background: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    cursor: pointer;
    color: #333;
    font-weight: bold;

    &:hover {
      background: rgba(255, 255, 255, 0.5);
    }
  }
</style>

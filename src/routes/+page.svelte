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

<div class="container">
	<div class="theme-switcher">
		<label for="theme-select">Choose a theme:</label>
		<select id="theme-select" bind:value={currentTheme}>
			<option value={themes.secretAngel}>Secret Angel</option>
			<option value={themes.secretSanta}>Secret Santa</option>
			<option value={themes.secretFriend}>Secret Friend</option>
		</select>
	</div>

	<h1>{currentTheme.title}</h1>

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
						<button type="button" onclick={() => deleteParticipant(index)}>
							<Icon icon="material-symbols:delete-outline-rounded" />
						</button>
					</div>
				{/each}

				<button type="button" onclick={addParticipant}>
					<Icon icon="material-symbols:add-circle-outline-rounded" />
				</button>

				<div class="form-actions">
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
</div>

<style>
	:global(body) {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 1rem;
	}

	.container {
		max-width: 600px;
		width: 100%;
		margin: 0 auto;
		padding: 2rem;
	}

	.theme-switcher {
		background: white;
		padding: 1rem 1.5rem;
		border-radius: 16px;
		box-shadow: var(--shadow-md);
		margin-bottom: 2rem;
		display: flex;
		align-items: center;
		gap: 1rem;
		flex-wrap: wrap;
		transition: all 0.3s ease;
	}

	.theme-switcher:hover {
		box-shadow: var(--shadow-lg);
		transform: translateY(-2px);
	}

	.theme-switcher label {
		font-weight: 600;
		color: var(--text-primary);
		font-size: 0.95rem;
	}

	.theme-switcher select {
		flex: 1;
		min-width: 150px;
		padding: 0.6rem 1rem;
		border: 2px solid var(--pastel-blue-200);
		border-radius: 12px;
		background: var(--pastel-blue-50);
		color: var(--text-primary);
		font-size: 0.95rem;
		cursor: pointer;
		transition: all 0.2s ease;
		outline: none;
	}

	.theme-switcher select:hover {
		border-color: var(--pastel-blue-400);
	}

	.theme-switcher select:focus {
		border-color: var(--pastel-blue-500);
		box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
	}

	h1 {
		font-size: 2.5rem;
		font-weight: 800;
		color: var(--pastel-blue-600);
		text-align: center;
		margin-bottom: 2rem;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.05);
		line-height: 1.2;
	}

	.participants-container {
		background: white;
		padding: 2rem;
		border-radius: 20px;
		box-shadow: var(--shadow-lg);
		transition: all 0.3s ease;
	}

	.error-message {
		background: var(--pastel-red-100);
		color: #991b1b;
		padding: 1rem 1.5rem;
		border-radius: 12px;
		margin-bottom: 1.5rem;
		border-left: 4px solid #dc2626;
		animation: slideIn 0.3s ease;
	}

	.error-message p {
		margin: 0;
		font-weight: 500;
	}

	.participant {
		display: grid;
		grid-template-columns: 1fr 1fr auto;
		gap: 0.75rem;
		margin-bottom: 1rem;
		animation: slideIn 0.3s ease;
	}

	.participant input {
		padding: 0.875rem 1rem;
		border: 2px solid var(--pastel-blue-200);
		border-radius: 12px;
		font-size: 1rem;
		background: var(--pastel-blue-50);
		transition: all 0.2s ease;
		outline: none;
	}

	.participant input:hover {
		border-color: var(--pastel-blue-300);
	}

	.participant input:focus {
		border-color: var(--pastel-blue-500);
		background: white;
		box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
	}

	.participant input::placeholder {
		color: var(--text-secondary);
	}

	.participant button {
		background: var(--pastel-red-100);
		border: 2px solid var(--pastel-red-100);
		color: #dc2626;
		padding: 0.875rem;
		border-radius: 12px;
		cursor: pointer;
		transition: all 0.2s ease;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.25rem;
	}

	.participant button:hover {
		background: #fecaca;
		border-color: #fca5a5;
		transform: scale(1.05);
	}

	.participant button:active {
		transform: scale(0.95);
	}

	form > button[type='button'] {
		width: 100%;
		padding: 0.875rem;
		background: var(--pastel-blue-100);
		border: 2px dashed var(--pastel-blue-400);
		color: var(--pastel-blue-600);
		border-radius: 12px;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		margin-top: 0.5rem;
		font-size: 1.25rem;
	}

	form > button[type='button']:hover {
		background: var(--pastel-blue-200);
		border-color: var(--pastel-blue-500);
		transform: translateY(-2px);
	}

	form > button[type='button']:active {
		transform: translateY(0);
	}

	.form-actions {
		margin-top: 1.5rem;
		padding-top: 1.5rem;
		border-top: 2px solid var(--pastel-blue-100);
	}

	.form-actions button {
		width: 100%;
		padding: 1rem 2rem;
		background: linear-gradient(135deg, var(--pastel-blue-400) 0%, var(--pastel-blue-500) 100%);
		color: white;
		border: none;
		border-radius: 12px;
		font-size: 1.1rem;
		font-weight: 700;
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: var(--shadow-md);
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.form-actions button:hover {
		transform: translateY(-2px);
		box-shadow: var(--shadow-lg);
		background: linear-gradient(135deg, var(--pastel-blue-500) 0%, var(--pastel-blue-600) 100%);
	}

	.form-actions button:active {
		transform: translateY(0);
	}

	.success-message {
		background: white;
		padding: 3rem 2rem;
		border-radius: 20px;
		box-shadow: var(--shadow-lg);
		text-align: center;
		animation: scaleIn 0.4s ease;
	}

	.success-message h2 {
		color: var(--pastel-blue-600);
		font-size: 1.75rem;
		margin-bottom: 2rem;
		font-weight: 700;
	}

	.success-message button {
		padding: 1rem 2rem;
		background: linear-gradient(135deg, var(--pastel-blue-400) 0%, var(--pastel-blue-500) 100%);
		color: white;
		border: none;
		border-radius: 12px;
		font-size: 1.1rem;
		font-weight: 700;
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: var(--shadow-md);
	}

	.success-message button:hover {
		transform: translateY(-2px);
		box-shadow: var(--shadow-lg);
		background: linear-gradient(135deg, var(--pastel-blue-500) 0%, var(--pastel-blue-600) 100%);
	}

	@keyframes slideIn {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes scaleIn {
		from {
			opacity: 0;
			transform: scale(0.9);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	/* Mobile responsive design */
	@media (max-width: 640px) {
		h1 {
			font-size: 2rem;
		}

		.container {
			padding: 1rem;
		}

		.theme-switcher {
			padding: 1rem;
			flex-direction: column;
			align-items: stretch;
		}

		.theme-switcher label {
			font-size: 0.9rem;
		}

		.theme-switcher select {
			width: 100%;
		}

		.participants-container {
			padding: 1.5rem;
		}

		.participant {
			grid-template-columns: 1fr;
		}

		.participant button {
			width: 100%;
		}

		.success-message {
			padding: 2rem 1.5rem;
		}

		.success-message h2 {
			font-size: 1.5rem;
		}
	}

	@media (max-width: 480px) {
		h1 {
			font-size: 1.75rem;
		}

		.participants-container {
			padding: 1.25rem;
		}

		.participant input {
			padding: 0.75rem;
			font-size: 0.95rem;
		}
	}
</style>

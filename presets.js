exports.get_presets = function (instanceLabel) {
	var presets = []
	
		presets.push({
			category: 'Power',
			label: 'Main Power On & Off',
			bank: {
				style: 'text',
				text: 'On Main',
				size: '24',
				color: 16777215,
				bgcolor: 0,
				latch: true
			},
			actions: [{
				action: 'power',
				options: {
					selectedFunction: '1 MAIN',
				}
			}],
			release_actions: [{
				action: 'power',
				options: {
					selectedFunction: '0',
				}
			}],
			feedbacks: [{
				type: 'powerFeedback',
				options: {
					fg: 16777215,
					bg: 6723840,
				},
			}],	
		})
		
		presets.push({
			category: 'Power',
			label: 'All Stop',
			bank: {
				style: 'text',
				text: 'All Stop',
				size: '24',
				color: 16777215,
				bgcolor: 16711680
			},
			actions: [{
				action: 'power',
				options: {
					selectedFunction: '!',
				}
			}],
		})

	return presets
}

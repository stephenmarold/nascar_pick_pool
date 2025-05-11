export const calculateParticipantScores = (participants, vehicles) => {
	if (!participants || !vehicles) {
		return [];
	}

	for (let i = 0; i < participants.length; i++) {
		const pick_1 = vehicles.find((vehicle) => {
			return vehicle.vehicle_number == participants[i].driver_1;
		});
		const pick_2 = vehicles.find((vehicle) => {
			return vehicle.vehicle_number == participants[i].driver_2;
		});
		const pick_3 = vehicles.find((vehicle) => {
			return vehicle.vehicle_number == participants[i].driver_3;
		});

		// Previously wasn't working. Will revisit.
		participants[i].cur_points = 0;
		participants[i].cur_points += pick_1?.running_position ?? 0;
		participants[i].cur_points += pick_2?.running_position ?? 0;
		participants[i].cur_points += pick_3?.running_position ?? 0;
	}
	const sortedParticipants = [...participants].sort(
		(a, b) => a.cur_points - b.cur_points
	);

	// Sort participants by score in descending order (lowest score is better)
	return sortedParticipants;
};

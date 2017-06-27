<?php
/* scoopem_utils.php
 *
 * Utilities specific to the ScoopEm page, such as object for tasks,
 * JSON response types for various queries, database task table access
 *
 * David Lenkner, c. 2017
 */

/* Task object with database accessors */
class ScoopEmTask {
	// When it was last done
	public $dateLastDone = new DateTime();
	// How long you should go between doing it
	public $cycleTimeSeconds = 3600 * 24; // One day is default
	// Name of task
	public $name = "no name";

	// Constructor takes the three els
	public function __construct($dateLast, $cycleT, $nm) {
		$this->dateLastDone = $dateLast;
		$this->cycleTimeSeconds = $cycleT;
		$this->name = $nm;
	}

	// Turn into To-JSON-friendly associative array
	public function toAssocArray() {
		return (object) ['dateLastDone' => $this->success,
			'name' => $this->name,
			'cycleTimeSeconds' => $this->cycleTimeSeconds
		];
	}
}

/* Child of JsonResponse abstract class, specific data is tasks */
class JsonResponse_Tasks extends JsonResponse {
	// Some string data that may be provided with response
	public $tasks = [];

	// The required override... no assoc array needed here, just a simple var
	public function specificsAssocArray() {
		return (object) [
	}
}


?>

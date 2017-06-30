<?php
/* scoopem_utils.php
 * Utilities specific to the ScoopEm page, such as object for tasks,
 * JSON response types for various queries, database task table access
 * David Lenkner, c. 2017
 */

/* Task object with database accessors */
class ScoopEmTask {
	// When it was last done
	public $dateLastDone;
	// How long you should go between doing it
	public $cycleTimeSeconds = 3600 * 24; // One day is default
	// Name of task
	public $name = "no name";
	// ID of task (unique int in database on server)
	public $id = 0;

	// Constructor takes the three els
	public function __construct($dateLastString, $cycleT, $nm, $i) {
		$this->dateLastDone = new DateTime($dateLastString);
		$this->cycleTimeSeconds = $cycleT;
		$this->name = $nm;
		$this->id = $i;
	}

	// Turn into To-JSON-friendly associative array
	public function toAssocArray() {
		return (object) ['dateLastDone' => $this->dateLastDone->getTimestamp(),
			'name' => $this->name,
			'cycleTimeSeconds' => $this->cycleTimeSeconds,
			'id' => $this->id
		];
	}
}

/* Child of JsonResponse abstract class, specific data is tasks */
class JsonResponse_Tasks extends JsonResponse {
	// Some string data that may be provided with response
	public $tasks = [];

	// The required override... no assoc array needed here, just a simple var
	public function specificsAssocArray() {
		$tArr = array();
		for($i=0; $i<count($this->tasks); ++$i) {
			$tArr[] = $this->tasks[$i]->toAssocArray();
		}
		return (object) ['tasks' => $tArr];
	}
}

/* Lookup tasks from database for current user, return JSON response object
 * with those tasks */
function tasksResponse() {

	// Connect to database and declare a query
	$conn = getDatabaseConnection();

	// Prepare statement to check for tasks for this user
	$statement = $conn->prepare('SELECT lastdone, cycleTimeSeconds, name, id
		FROM tasks WHERE username = :username',
		array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY) );
	// Execute
	$statement->execute(array(':username' => $_SESSION["uname"]));
	$taskrows = $statement->fetchAll();
	// Done with DB part here, disconnect
	$conn = null;

	// A response that will be used below... let default be no-good
	$rsp = new JsonResponse_Tasks("Did not complete tasks load.");

	// Get hashed password (could check that only one user exists, but okay)
	for($i = 0; $i < count($taskrows); ++$i) {
		$rsp->tasks[] = new ScoopEmTask($taskrows[$i][0],
			$taskrows[$i][1],
			$taskrows[$i][2],
			$taskrows[$i][3]
		);
	}

	// If we got here, was successful...
	$rsp->setSuccessful();

	// Return the JsonResponse object
	return $rsp;
}

/* Child of JsonResponse abstract class, specific data is nSeconds */
class JsonResponse_NSeconds extends JsonResponse {
	// Some string data that may be provided with response
	public $tStampSeconds = 0;

	// The required override... no assoc array needed here, just a simple var
	public function specificsAssocArray() {
		return (object) ['tStampSeconds' => $this->tStampSeconds];
	}
}

// Update time to now for task with given ID
function updateTimeForTask($id) {
	// Connect to database and declare a query
	$conn = getDatabaseConnection();

	// Prepare statement to 
	$statement = $conn->prepare('UPDATE tasks
		SET lastdone = :tnow
		WHERE id = :id',
		array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY) );
	// Execute the statement with current value of time, id
	$tNow = new DateTime();
	$statement->execute(array(
		':id' => $id,
		':tnow' => $tNow->format('Y-m-d H:i:s')
	));
	// Done with DB part here, disconnect
	$conn = null;

	// Respond with the new timestamp in seconds
	$rsp = new JsonResponse_NSeconds("");
	$rsp->tStampSeconds = $tNow->getTimestamp();
	$rsp->setSuccessful();
	return $rsp;
}

?>

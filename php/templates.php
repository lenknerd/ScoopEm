<?php
/* template.php
 * For the templates used in views, main thing is just to grab and return html
 * which is done in main api Slim route.  But for some, special things have to
 * be done like modifying html, or restricting access based on credentials.
 * Those specifics are done here, switched by template name.
 * David Lenkner, c. 2017
 */

/* Various actions specific to particular templates or classes of templates
 * all of them load html somehow, but some may modify that after, some may
 * check session authentication before choosing what to load, etc.
 */
function handleTemplateSpecifics($req, $resp, $args, $tplName, &$htdoc) {

	/* If we're an internal-only template, will be inside /internal/ folder.
	 * List them here so can validate and look in there
	 */
	$internalPages = ["main"];

	if( in_array($tplName, $internalPages) ) {
		if( hasValidSession() ) {
			$htdoc->loadHTMLFile("../html/${tplName}.html");
		} else {
			// Read in the unauthorized access deal
			$htdoc->loadHTMLFile("../html/unauthorizedTemplate.html");
		}
	} else {
		// If not an internal page, no need to check session
		$htdoc->loadHTMLFile("../html/${tplName}.html");
	}

}


?>

//-----------------------------------------------------
// Automated side-by-side page numbering for InDesign
// 
// Author: Andrew Heiss (www.andrewheiss.com)
// Date: 2013-03-15
//-----------------------------------------------------

// Documentation for ExtendScript at http://jongware.mit.edu/idcs6js/
// Specifically:
//     * http://jongware.mit.edu/idcs6js/pc_Document.html
//     * http://jongware.mit.edu/idcs6js/pc_Page.html
//     * http://jongware.mit.edu/idcs6js/pc_Section.html
//     * http://jongware.mit.edu/idcs6js/pe_PageNumberStyle.html


//---------------
// Script setup
//---------------
// Determine the absolute number of the page by selecting the page in InDesign and running the following in the ExtendScript Toolkit JavaScript Console:
// app.activeWindow.activePage.documentOffset;

var startingPage = 45  // Absolute page number, zero-based. Should be odd, since English starts on a verso (which is odd in absolute numbers)
var endingPage = 195  // Absolute page number, zero-based. Can be even or odd (even if ending on an Arabic recto; odd if ending on English verso to continue rest of numbering in English)

// IMPORTANT: Make sure "Allow selected spread to shuffle" is disabled on all the pages in the startingPage-endingPage range, INCLDUING the next non-side-by-side page (if ending on an English verso).
// ALSO IMPORTANT: Make sure there are no existing sections in the startingPage-endingPage range. The script will choke.
// If you do have existing sections, run removeSections.jsx to, um, remove them.

var actualPage = 1;  // The desired number of the first actual page


//----------------
// Actual script
//----------------
var myDoc = app.activeDocument;  // Create document object

// Loop through page range. First run use `englishSection`, second use `arabicSection`, repeat ad infinitum
for (var i=startingPage; i<=endingPage; i++) {
    var myPage = myDoc.pages[i];  // Load the current page

    // Section options for each language
    var englishSection= {continueNumbering:false, 
		pageNumberStart:actualPage, 
		sectionPrefix:"", 
		includeSectionPrefix:false, 
		pageNumberStyle:PageNumberStyle.ARABIC}  // See http://jongware.mit.edu/idcs6js/pe_PageNumberStyle.html for cryptic value

    var arabicSection = {continueNumbering:false, 
		pageNumberStart:actualPage, 
		sectionPrefix:"A",  // For page uniqueness
		includeSectionPrefix:false,  // Hide the prefix on the actual pages
		pageNumberStyle:"Hindi Digits (١,٢,٣,٤,٥...)"}  // Found in Section.name, since "Hindi digits" isn't formally documented in the API

	// Alternatively, you set properties after the fact:
	// var newSection = myDoc.sections.add(myPage);
	// newSection.sectionPrefix = "A";
	// newSection.includeSectionPrefix = false;
    
    // Add an English section to odd pages (verso), Arabic section to even pages (recto) 
    if (i%2 != 0) { 
        myDoc.sections.add(myPage, englishSection);
    } else {
        myDoc.sections.add(myPage, arabicSection);
        actualPage++;  // Increment for next spread
    }

}

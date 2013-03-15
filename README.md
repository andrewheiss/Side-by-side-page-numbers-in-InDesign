# Background

The books I make for the [Middle East Texts Initiative](http://meti.byu.edu/) contain side-by-side English-Arabic translations of old Arabic, Hebrew, and Latin texts. InDesign can generally handle the side-by-side parallel stories and text frames, but it cannot properly number the pages. After all the front matter and introductory text, the English translation starts on a verso page (left) with page 1, followed by a page of Arabic on the recto (right), also on page 1. The next verso is page 2. 

InDesign doesn't include a way to insert automatic spread numbers instead of page numbers, which means there's no easy way to have automatic parallel, same-numbered pages. For years users have come up with kludgy solutions, like (1) making a list of page numbers in Excel and placing that list in a threaded text box on every master page (kind of like [this](http://indesignsecrets.com/making-numbered-tickets.php)), (2) [placing a document of empty lines](http://indesignsecrets.com/create-spread-numbers.php) to take advantage of InDesign's automatic paragraph numbering, and (3) [making a special text variable](http://indesignsecrets.com/create-spread-numbers.php#comment-497592) for each page ([automated version](http://benmilander.com/content/number-spreads-free-script)).

These methods all work, but with one big caveat—they don't deal with any of the *actual* page numbers. If you try to build an automatic table of contents after using any of these methods, you'll get page numbers, not the spread numbers. Similarly, the exported PDF will show page numbers instead of spread numbers. 

The only real way to get true side-by-side numbering is to create new sections for each page. Right click on one of your pages, start a section at page 1. Right click on the next page, start a section at page 1 with some prefix (so there aren't duplicate pages). Right click on the next page, start a section at page 2. And so on for the all the side-by-side pages. 

Crazy tedious. But totally automatable with a script. Here's how to do it (works in CS6, probably in CS4, 5, and 5.5 too):

# Using the script

1. Select all the side-by-side pages in your InDesign document, right click on the selection, and deselect "Allow selected spreads to shuffle." This will let versos hold odd-numbered pages. If you don't do this, you'll get a lot of single-page spreads.  
![Disable shuffling](http://files.andrewheiss.com/images/side_by_side_numbers/spreads_shuffle.png)
2. Download `sideBySideNumbering.jsx` from GitHub and open it in ExtendScript Toolkit. You probably don't need to install it in your InDesign scripts folder (since the script parameters will change with each document you use it on). Ensure the IDE is using the InDesign library and not the default "ExtendScript Toolkit CS6."  
![Select object library](http://files.andrewheiss.com/images/side_by_side_numbers/select_library.png)
3. Determine the absolute page numbers for the first and last pages of your side-by-side section. You can do this by counting manually (the very first page in your document is page 0, second is 1, etc.) or by selecting a page and running `app.activeWindow.activePage.documentOffset;` in the JavaScript Console.  
![JavaScript Console](http://files.andrewheiss.com/images/side_by_side_numbers/console.png)
4. Replace the values for `startingPage` and `endingPage` with those numbers.
5. Set `actualPage` to the number you want your side-by-side pages to start with.
6. Modify the section options in lines 41–51. As they stand now, `englishSection` goes on the verso/left and `arabicSection` goes on the recto/right. See [documentation](http://jongware.mit.edu/idcs6js/pc_Section.html) for more details on what options can be set here. If you want identical numbers on both sides (i.e. not English/Arabic, but English/English, like for an atlas or some other single-language side-by-side document), modify `pageNumberStyle` for the `arabicSection`.
7. Run the script. You should have a ton of new sections and everything should be numbered correctly.  
![All done!](http://files.andrewheiss.com/images/side_by_side_numbers/finished.png)


# License

All files in this repository are free and open source software and are provided under the MIT license.

Copyright (C) 2013 Andrew Heiss

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

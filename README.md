# Background

The only real way to get true side-by-side numbering is to create new sections for each page (see [this blog post](http://www.andrewheiss.com/blog/2013/03/15/side-by-side-page-numbers-indesign/) for reasons why you would want side-by-side numbering). Right click on one of your pages, start a section at page 1. Right click on the next page, start a section at page 1 with some prefix (so there aren't duplicate pages). Right click on the next page, start a section at page 2. And so on for the all the side-by-side pages. 

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

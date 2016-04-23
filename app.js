/**
 * ##### 110110011000011011011000101101011101100010110001001000001101100110000101110110011000011000100000110110001010011111011001100001001101100110000100110110011000011100100000110110011000100000100000110110011000000111011000101010101101100010101101001000001101100110000010110110001011000111011011100011001101100010101000
 *
 * @since 2016/04
 * @author Reiha Hosseini ( @mrReiha ) <iam@reiha.net>
 */
 ;!( function( w, d ) {

    'use strict';

    var fullscreenProject = function( e ) {

            var section = this.querySelector( 'span' ),
                fullSection = section.cloneNode(),

                sectionPos = section.getBoundingClientRect(),

                closeButton = d.createElement( 'a' ),

                i;

            if ( lastActiveItemFull )
                closeFullSection();

            fullSection.className += ' full';

            [ 'left', 'top', 'width', 'height' ].forEach( function( val, key ) {

                fullSection.style[ val ] = sectionPos[ val ] + 'px';

            });

            d.body.appendChild( fullSection );

            fullSection.offsetHeight;

            fullSection.style.top = fullSection.style.left = 0 + 'px';
            fullSection.style.width = innerWidth + 'px';
            fullSection.style.height = innerHeight + 'px';

            closeButton.className = 'close';
            closeButton.addEventListener( 'click', closeFullSection, false );

            fullSection.appendChild( closeButton );

            lastActiveItemPos = sectionPos;
            lastActiveItemFull = fullSection;

            fullSection.addEventListener( 'transitionend', endOfFXInside, false );

            this.blur();

            importProjectFile( this.getAttribute( 'data-page' ) );

            e.preventDefault();

        },

        endOfFXInside = function( e ) {

            this.className += ' show ready-to-close';

            this.removeEventListener( 'transitionend', endOfFXInside, false );

        },

        endOfFXOutside = function( e ) {

            if ( e.propertyName == 'width' )
                this.parentNode.removeChild( this );

        },

        importProjectFile = function( address ) {

            var xhr = new XMLHttpRequest();

            if ( !address || !lastActiveItemPos )
                return false;

            xhr.onreadystatechange = function( e ) {

                if ( this.readyState == 'complete' || this.readyState == 4 ) {

                    if ( this.status == 200 )
                        lastActiveItemFull.insertAdjacentHTML( 'beforeend', this.responseText );
                    else
                        lastActiveItemFull.insertAdjacentHTML( 'beforeend',
                                '<h2>Error!<br /><small>Reload the page and contact us if it was still there.<small></h2>' );

                }

            }

            xhr.open( 'GET', 'projects/' + address + '.html' );
            xhr.send();

        },

        closeFullSection = function( e ) {

            var pos = lastActiveItemPos;

            if ( !pos )
                return;

            lastActiveItemFull.className = lastActiveItemFull.className.replace( /show/gi, '' );

            lastActiveItemFull.style.width = pos.width + 'px';
            lastActiveItemFull.style.height = pos.height + 'px';
            lastActiveItemFull.style.top = pos.top + 'px';
            lastActiveItemFull.style.left = pos.left + 'px';

            lastActiveItemFull.addEventListener( 'transitionend', endOfFXOutside, false );

            lastActiveItemPos = lastActiveItemFull = false;

            if ( e )
                e.preventDefault();

        },

        keyDown = function( e ) {

            var code = e.keyCode || e.charCode || e.which || 0;

            if ( !code )
                return;

            // Escape
            if ( code == 27 && lastActiveItemFull )
                closeFullSection();

        },

        projects = d.querySelectorAll( 'li a' ),
        projectsLen = projects.length,

        lastActiveItemPos,
        lastActiveItemFull,

        len;

    w.addEventListener( 'keydown', keyDown, false );

    len = projectsLen;

    while ( len-- )
        projects[ len ].addEventListener( 'click', fullscreenProject, false );

})( this, document );

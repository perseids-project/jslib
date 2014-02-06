/**
 * Sort arrays
 */
function Sorted() {}

Sorted.prototype.areaSort = function( _origArray, _x, _y1, _y2, _rollover, _depth ) {
	console.log( _depth );
	//------------------------------------------------------------
	//  Set some default values
	//------------------------------------------------------------
	_rollover = ( _rollover == undefined ) ? [] : _rollover;
	_depth = ( _depth == undefined ) ? 0 : _depth;
	_x = ( _x == undefined ) ? 'x' : _x;
	_y1 = ( _y1 == undefined ) ? 'y1' : _y1;
	_y2 = ( _y2 == undefined ) ? 'y2' : _y2;
	if ( _rollover.length-1 < _depth ) {
		_rollover[ _depth ] = [];
	}
	//------------------------------------------------------------
	//  Check to make sure _origArray is an array of objects.
	//------------------------------------------------------------
	if ( typeof _origArray[0] !== 'object' ) {
		throw "Sorted.areaSort() -- First parameter must be an array of objects";
		return null;
	}
	//------------------------------------------------------------
	//  Find the lowest Y
	//------------------------------------------------------------
	var lowestIndex = 0;
	var lowestY = parseInt( _origArray[ lowestIndex ]['param'][ _y1 ] );
	for ( var i=1, ii=_origArray.length; i<ii; i++ ) {
		var check = parseInt( _origArray[i]['param'][ _y1 ] );
		if (  check < lowestY ) {
			lowestY = check;
			lowestIndex = i;
		}
	}
	//------------------------------------------------------------
	//  Find other rectangles in row
	//------------------------------------------------------------
	var lowest = _origArray.splice( lowestIndex, 1 );
	lowest = lowest[0];
	_rollover[ _depth ].push( lowest );
	var min = parseInt( lowest['param'][ _y1 ] );
	var max = parseInt( lowest['param'][ _y2 ] );
	i = _origArray.length
	while ( i-- ) {
		var y1 = parseInt( _origArray[i]['param'][ _y1 ] );
		var y2 = parseInt( _origArray[i]['param'][ _y2 ] );
		var height = y2-y1;
		var check = y1+(height/2);
		if ( check >= min && check <= max ) {
			var splice = _origArray.splice( i,1 );
			splice = splice[0];
			_rollover[ _depth ].push( splice );
		}
	}
	//------------------------------------------------------------
	//  Done sorting?
	//------------------------------------------------------------
	if ( _origArray.length == 0 ) {
		
		/*
		// Just for debugging.
		*/
		for ( var i=0; i<_rollover.length; i++ ) {
			console.log( '---group_'+i+'---' );
			for ( var j=0; j<_rollover[i].length; j++ ) {
				console.log( _rollover[i][j].id );
			}
		}
		return _rollover;
	}
	//------------------------------------------------------------
	//  Nope... well then do it again.
	//------------------------------------------------------------
	else {
		_depth+=1;
		this.areaSort( _origArray, _x, _y1, _y2, _rollover, _depth );
	}
	
}
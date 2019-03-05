import React, { Component } from 'react';

import ReactPlayer from 'react-player'
import { originBaseUrl } from 'api/api';

class MediaPlayer extends Component {
    componentWillMount() {
        var tracks  = this.props.mediaitem.subtitles.map(function(subtitle) {
            return ({
                kind: 'subtitles', 
                src: originBaseUrl + subtitle.url, 
                srcLang: subtitle.source_language,
                label: subtitle.label
            });
        });

        this.config = {
            file: {}
        }
        this.config.file.tracks = tracks;

        this.url = originBaseUrl + this.props.mediaitem.url
    }

    render () {
        return (
            <ReactPlayer 
                url={this.url} 
                controls 
                // playing
                width="100%"
                config={this.config}/>
        )
    }
}

export default MediaPlayer;
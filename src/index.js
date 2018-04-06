import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';
import SearchBar from './components/searchbar';
import VideoList from './components/video_list';
import VideoDetail from './components/videodetail';

//Import API Key from a file in .gitignore
import YT_API_KEY from '../credentials';

//Plug in your YouTube API key here to let this run
const YT_KEY = YT_API_KEY;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            selectedVideo: null
        };
        this.videoSearch('smash melee');
    }

    videoSearch(term) {

        YTSearch({ key: YT_KEY, term: term }, (videos) => {
            this.setState({ videos, selectedVideo: videos[0] });
        });

    }

    render() {

        const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300); 

        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch} />
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList
                    onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
                    videos={this.state.videos} />
            </div>
        );
    }

}

ReactDOM.render(<App />, document.querySelector('.container'));
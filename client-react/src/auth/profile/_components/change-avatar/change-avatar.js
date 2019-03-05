import React from 'react';
import { 
    Button, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter 
} from 'reactstrap';

import ReactCrop from 'react-image-crop'

class ChangeAvatarModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            src: null,
            crop: {
                x: 20,
                y: 20,
                width: 40,
                aspect: 1
            },
            img: null
        };
    }

    onSelectFile = e => {
        if (e.target.files && e.target.files.length > 0) {
          const reader = new FileReader()
          reader.addEventListener(
            'load',
            () => 
              this.setState({
                src: reader.result,
              }),
            false
          )
          reader.readAsDataURL(e.target.files[0])
        }
    }

    onCropChange = crop => {
        this.setState({ crop })
    }
    
    onComplete = (crop, pixelCrop) => {
        if (this.state.img) {
            this.setCroppedImg(this.state.img, pixelCrop)
        }
    }

    setCroppedImg = (image, pixelCrop) => {
        this.setState({ img: image });
        const canvas = document.createElement('canvas');
        canvas.width = 250;
        canvas.height = 250;
        const ctx = canvas.getContext('2d');
      
        ctx.drawImage(
            image,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            250,
            250
        );
      
        this.setState({base64Image: canvas.toDataURL('image/png')})
    }

    ok = () => {
        this.props.onSubmit(this.state.base64Image)
    }

    cancel = () => {
        this.setState({
            base64Image: '',
            src: ''
        })
        this.props.toggle()
    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen} toggle={this.cancel} size="lg">
                <ModalHeader toggle={this.cancel}>Change Avatar</ModalHeader>
                <ModalBody>
                    <div>
                        <input type="file" onChange={this.onSelectFile} />
                    </div>
                    <div className="flex_row space_around">
                        <div style={{height:250}}>

                            {this.state.src && (
                            <ReactCrop
                                src={this.state.src}
                                crop={this.state.crop}
                                onImageLoaded={this.setCroppedImg}
                                onChange={this.onCropChange}
                                onComplete={this.onComplete}
                            />
                            )}
                        </div>
                        <div style={{height:250}}>
                            {this.state.base64Image && (
                            <img className="round" src={this.state.base64Image} alt=""/>
                            )}
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="warning" onClick={this.cancel}>Cancel</Button>
                    <Button color="primary" onClick={this.ok}>Submit</Button>{' '}
                </ModalFooter>
            </Modal>
        );
    }
}

export { ChangeAvatarModal };
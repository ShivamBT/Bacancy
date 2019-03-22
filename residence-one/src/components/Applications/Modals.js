import React,{Component} from 'react';
import { Modal,ModalHeader,ModalBody} from 'reactstrap';
import axios from 'axios';


export class ModalPacket extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            token:''
        }
    }

    async componentDidMount()
    {
        console.log("Did mount called");
        this.setState({ token: localStorage.getItem("token") });
        let result = await axios.get(`http://localhost:8080/api/reception/getpacket/${this.props.id}`,
        //     {
        //         headers: {
        //             token: localStorage.getItem("token")
        //     }
            // }
        );
        console.log("Result of recover packet is :", result);
    }
    render()
    {
        return (
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
                <ModalHeader toggle={this.props.toggle}>
                    <div>
                        <p>Packet Recovery</p>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <div>
                        <p> Packet Number</p>
                    </div>
                    <div>
                        <p>Packet Modal</p>
                    </div>
                </ModalBody>

            </Modal>

        );
    }
    
}
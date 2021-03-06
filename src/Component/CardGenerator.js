import React, { Component, Fragment } from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';

const colors = {
    '1': 'green-card',
    '2': 'red-card',
    '3': 'blue-card'
}

const fonts = {
    '1': 'ubuntu-card ',
    '2': 'comic-card ',
    '3': 'montse-card'
}

const maxSelects = 3

let fr = new FileReader();

class CardGenerator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            twitter: "js-hidden-twitter",
            skillsList: [],
            selectedSkills: ['HTML'],
            url: "",
            data: {
                email: "",
                github: "",
                job: "",
                linkedin: "",
                name: "",
                palette: "1",
                phone: "",
                photo: "",
                typography: "2",
                skills: ['HTML'],
            },
        }

        this.getPhoto = this.getPhoto.bind(this);
        this.handleChangeInputRadioColor = this.handleChangeInputRadioColor.bind(this);
        this.handleChangeInputRadioTipo = this.handleChangeInputRadioTipo.bind(this);
        this.handleChangeInputGithub = this.handleChangeInputGithub.bind(this);
        this.handleChangeInputName = this.handleChangeInputName.bind(this);
        this.handleChangeInputJob = this.handleChangeInputJob.bind(this);
        this.handleChangeInputLinkedin = this.handleChangeInputLinkedin.bind(this);
        this.handleChangeInputTelf = this.handleChangeInputTelf.bind(this);
        this.handleChangeInputMail = this.handleChangeInputMail.bind(this);
        this.handleLoadPhoto = this.handleLoadPhoto.bind(this);
        this.twitterButton = this.twitterButton.bind(this);
        this.callingAbilities = this.callingAbilities.bind(this);
        // this.retrievedLocalStorage = this.retrievedLocalStorage.bind(this);
        this.saveLocalStorage = this.saveLocalStorage.bind(this);
        this.jsonResponse = this.jsonResponse.bind(this);
        this.createCard = this.createCard.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleSelect = this.handleSelect.bind(this)
        this.addSelect = this.addSelect.bind(this)
        this.removeSelect = this.removeSelect.bind(this)
        this.callingAbilities()
        this.profilePhoto = React.createRef();
        // this.retrievedLocalStorage();
    }

    componentDidMount() {
        this.retrievedLocalStorage();
    }
    //fetch 
    createCard() {
        const { data } = this.state
        fetch('https://us-central1-awesome-cards-cf6f0.cloudfunctions.net/card/', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            },

        })
            .then(function (resp) {
                return resp.json();
            })
            .then((resp) => {
                this.setState({
                    url: resp.cardURL,
                });
            })
            .catch(function (error) {
                console.log(error);
            })
        if (this.state.twitter === "js-hidden-twitter") {
            const { twitter } = this.state
            this.setState({
                twitter: ""
            })
        }
    }

    //Recuperar localStorage
    retrievedLocalStorage() {
        let retrievedData = localStorage.getItem('dataStoraged');
        if (retrievedData !== null) {
            let dataParsed = JSON.parse(retrievedData);
            this.setState(
                { data: dataParsed }
            )
        }
    }

    //Crear loccalStorage
    saveLocalStorage() {
        localStorage.setItem('dataStoraged', JSON.stringify(this.state.data));
    }

    handleReset(event) {
        localStorage.clear();

        this.setState(
            {
                data: {
                    email: "",
                    github: "",
                    job: "",
                    linkedin: "",
                    name: "",
                    palette: "1",
                    phone: "",
                    photo: "",
                    typography: "2",
                    skills: ['HTML'],
                }
            }
        )
    }

    handleChangeInputRadioColor(event) {
        this.setState({
            data: {
                ...this.state.data,
                palette: event.target.value
            }
        })
    }
    //   input file
    getPhoto(event) {
        this.profilePhoto.current.click();
    }


    handleLoadPhoto(event) {
        this.profilePhoto.current.files[0];
        const writePhoto = () => {
            this.setState(
                {
                    data: {
                        ...this.state.data,
                        photo: fr.result
                    }
                }
            )
        }
        fr.addEventListener('load', writePhoto);
        fr.readAsDataURL(this.profilePhoto.current.files[0]);
    }

    handleChangeInputRadioTipo(event) {
        this.setState({
            data: {
                ...this.state.data,
                typography: event.target.value
            }
        })
    }

    handleChangeInputGithub(e) {
        this.setState({
            data: {
                ...this.state.data,
                github: e.target.value
            }
        }, )
    }

    handleChangeInputName(e) {
        this.setState({
            data: {
                ...this.state.data,
                name: e.target.value
            }
        }, )
    }

    handleChangeInputMail(e) {
        this.setState({
            data: {
                ...this.state.data,
                email: e.target.value
            }
        }, )
    }

    handleChangeInputTelf(e) {
        this.setState({
            data: {
                ...this.state.data,
                phone: e.target.value
            }
        }, )
    }

    handleChangeInputJob(e) {
        this.setState({
            data: {
                ...this.state.data,
                job: e.target.value
            }
        }, )
    }

    handleChangeInputLinkedin(e) {
        this.setState({
            data: {
                ...this.state.data,
                linkedin: e.target.value
            }
        }, )
    }

    //hacer método y bind de funcion json dentro de constructor
    callingAbilities() {
        fetch('https://raw.githubusercontent.com/Adalab/dorcas-s2-proyecto-data/master/skills.json')
            .then(function (response) {
                return response.json();
            })
            .then(this.jsonResponse)
    }

    jsonResponse(json) {
        this.setState(
            {
                skillsList: json.skills,
                selectedSkills: [json.skills[0]],
            }
        )
    }

    handleSelect(skill, i) {
        const prevSkills = [...this.state.selectedSkills];
        prevSkills.splice(i, 1, skill);
        this.setState({
            selectedSkills: prevSkills,
            data: {
                ...this.state.data,
                skills: prevSkills
            }
        })
    }

    addSelect() {
        const nextSkills = [...this.state.selectedSkills];
        const nextElem = this.state.skillsList[0];
        nextSkills.push(nextElem);
        if (this.state.selectedSkills.length < maxSelects) {
            this.setState({
                selectedSkills: nextSkills,
                data: {
                    ...this.state.data,
                    skills: nextSkills
                }
            })
        } else {
            console.log('Máximo 3 habilidades')
        }
    }

    removeSelect(i) {
        const nextSkills = [...this.state.selectedSkills]
        nextSkills.splice(i, 1);
        this.setState({
            selectedSkills: nextSkills,
            data: {
                ...this.state.data,
                skills: nextSkills
            }
        })
    }


    twitterButton() {
        window.location.href = `https://twitter.com/share?text=Tarjeta%20de%20de%20presentaci%C3%B3n%20con%20Awesome%20profile-cards%20(Brujas%20de%20appendChild%20-%20Sprint3%20de%20Adalab)&hashtags=WomenInTech&url=${this.props.createdLink}`;
    }

    render() {
        setTimeout(this.saveLocalStorage, 500);
        return (
            <Fragment>
                <Header />
                {
                    this.state.skillsList.length > 0
                        ? <Main
                            color={colors[this.state.data.palette]}
                            font={fonts[this.state.data.typography]}
                            data={this.state.data}
                            skillsList={this.state.skillsList}
                            selectedSkills={this.state.selectedSkills}
                            maxSelects={maxSelects}
                            handleSelect={this.handleSelect}
                            addSelect={this.addSelect}
                            removeSelect={this.removeSelect}
                            handleOnChangeColor={this.handleChangeInputRadioColor}
                            handleOnChangeTipo={this.handleChangeInputRadioTipo}
                            handleOnChangeGithub={this.handleChangeInputGithub}
                            handleOnChangeName={this.handleChangeInputName}
                            handleOnChangeTelf={this.handleChangeInputTelf}
                            handleOnChangeMail={this.handleChangeInputMail}
                            handleOnChangeLinkedin={this.handleChangeInputLinkedin}
                            handleOnChangeJob={this.handleChangeInputJob}
                            handleOnChangePhoto={this.handleLoadPhoto}
                            twitterButton={this.twitterButton}
                            handleReset={this.handleReset}
                            getPhoto={this.getPhoto}
                            refInput={this.profilePhoto}
                            miniPhoto={this.state.data.photo}
                            createCard={this.createCard}
                            createdLink={this.state.url}
                            hiddenTwitter={this.state.twitter}
                        />
                        : <div>Cargando...</div>
                }
                <Footer />
            </Fragment>

        );
    }
}

export default CardGenerator;
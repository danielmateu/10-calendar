import { useEffect, useMemo, useState } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';

import Modal from 'react-modal'

import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';

import Swal from 'sweetalert2'
import { useCalendarStore, useUiStore } from '../../hooks';


registerLocale('es',es)

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        margin: '4em auto',
        transform: 'translate(-50%, -50%)',
        // backgroundColor: '#383838',
        // color: 'white',

    },
};

Modal.setAppElement('#root');


export const CalendarModal = () => {

    const {isDateModalOpen, closeDateModal} = useUiStore()
    // const [isOpen, setIsOpen] = useState(true)
    const [formSubmited, setFormSubmited] = useState(false)

    const {activeEvent, startSavingEvent} = useCalendarStore()

    
    const [formValues, setformValues] = useState({
        title: '',
        notes: '',
        start: new Date(),
        end: addHours(new Date(), 2)
        
    })
    
    const titleClass = useMemo(() => {
        if(!formSubmited) return '';

        return ((formValues.title.length > 0) ? '' : 'is-invalid')

    }, [formValues.title,formSubmited])

    useEffect(() => {
        
        if(activeEvent !== null){
            setformValues({...activeEvent})
        }

    }, [activeEvent])
    

    const onInputChange = ({ target }) => {
        setformValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const onDateChanged = (event, changing = 'start') => {
        setformValues({
            ...formValues,
            [changing]: event
        })
    }

    const onCloseModal = () => {
        // console.log('Cerrando Modal')
        // setIsOpen(false);
        closeDateModal()

    }

    const onSubmit = async(event) =>{
        event.preventDefault();
        setFormSubmited(true);

        const difference = differenceInSeconds(formValues.end, formValues.start);
        // console.log({difference})

        if(isNaN(difference)|| (difference <= 0)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Revisar los datos introducidos 😉',
                footer: '<a href="">A qué se debe este error?</a>'
            })
            // console.log('Error en fechas');
            return
        }

        if(formValues.title.length <= 0) 
        
        return;

        // console.log(formValues);

        //TODO:

        await startSavingEvent(formValues);
        closeDateModal();
        setFormSubmited(false);
        // cerrar Modal
        // remover errores en pantalla
    }

    


    return (
        <Modal
            isOpen={isDateModalOpen}
            onRequestClose={onCloseModal}
            style={customStyles}
            className='modal'
            overlayClassName='modal-fondo'
            closeTimeoutMS={200}
        // contentLabel="Example Modal"
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form className="container" onSubmit={onSubmit}>

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <DatePicker
                        onChange={(event) => onDateChanged(event, 'start')}
                        selected={formValues.start}
                        className="form-control"
                        showTimeSelect
                        dateFormat='Pp'
                        locale='es'
                        timeCaption='Hora'
                        
                    />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <DatePicker
                        minDate={formValues.start}
                        onChange={(event) => onDateChanged(event, 'end')}
                        selected={formValues.end}
                        className="form-control"
                        showTimeSelect
                        dateFormat='Pp'
                        locale='es'
                        timeCaption='Hora'
                        
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${titleClass}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={formValues.title}
                        onChange={onInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={formValues.notes}
                        onChange={onInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}


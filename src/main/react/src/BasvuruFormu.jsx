import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Alert, Col, FormSelect, InputGroup, Modal, Row} from "react-bootstrap";
import InputGroupText from "react-bootstrap/InputGroupText";
import NavigasyonBari from "./NavigasyonBari.jsx";

const BasvuruFormu = () => {
    const [formData, setFormData] = useState({
        isim:"",
        tc:"",
        adres:"",
        telefon:"",
        email:"",
        dogumTarihi:"",
        tecrube:"yok",
        neden:"",
        lokasyon:"",
        yatirim:"",
        ek:""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();//sayfanin yenilenmesini engellemek icin
        if(!(Object.values(error).some(err => err !== ""))){

            if(formData.neden===""){

                setFormData({...formData,neden:"belirtilmemis"});//api kisminda nulllu hic bir hata almak istemedigimden ekstra onlem
            }try{const response = await axios.post("http://localhost:8080/basvur" , formData);
                setMessage(response.data);
                setModal(true)}
            catch(error){
                console.log("form gonderimi sirasinda hata")
                if(error.response || error.response.status === 409){
                    setMessage(error.response.data);
                }else{
                    setMessage("Form gonderimi sirasinda hata olustu lufen tekrar deneyin");
                }
                setModal(true);
            }
        }else{
            setMessage("Lutfen bilgilerinizi kontrol ediniz")//
            setModal(true)//hatali form gonderimine daha cok dikkat cekmek icin
        }
    };
    const [modal, setModal] = useState(false)

    const [error, setError] = useState({
    });
    const handleTcChange = e => {
        setFormData({ ...formData,tc: e.target.value });
        if(!/^\d{11}$/.test(e.target.value)){// 11 haneli sayi
            setError({...error,tc:"Lutfen gecerli bir TC giriniz."})
        } else{
            const sayilar = e.target.value.split("").map(Number);//sayiyi bol
            const ilk10sayi = sayilar.slice(0, 10).reduce((a, b) => a + b, 0);//ilk 10 sayiyi tek basamak kalana kadar topla
            if (ilk10sayi%10 !== sayilar[10]){//ilk 10 basamagin toplamiyla son basamagi kontrol et
                setError({...error,tc:"Lutfen gecerli bir TC giriniz."});
            }else{
                setError({...error,tc:""});}
        }
    }// algoritmaya uygun bir tc alabilmek icin
    const handleTelefonChange = e => {
        setFormData({...formData,telefon:e.target.value});
        if(!/^5\d{9}$/.test(e.target.value)){//5 ile baslayan 10 haneli bir sayi almak icin
            setError({...error,telefon:"Lutfen telefon numaranizi basinda 0 olmadan giriniz."})
        }else{
            setError({...error,telefon:""});
        }
    }

    const handleYatirimChange = e => {
        setFormData({...formData,yatirim:e.target.value});
        if(0 >= (e.target.value)){// sadece pozitif degerleri kabul etmek icin
            setError({...error,yatirim:"Ya para bulun ya da baska yerde para dilenin yatirim degeri pozitif olmalidir"});
        }else{
            setError({...error,yatirim:""});
        }
    }
    const handleIsimChange = e => {
        setFormData({...formData,isim:e.target.value});
        if (!/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/.test(e.target.value)){// ismin sadece harflerden olusmasi icin
            setError({...error,isim:"isminizde sayi ya da ozel karakter olsa bile lutfen harfler ile yazarak giriniz"})
        }else{
            setError({...error,isim:""});
        }
    }
    const handleDogumTarihiChange = e => {
        const today = new Date();
        setFormData({...formData, dogumTarihi:e.target.value});
        const uye ={
            year: e.target.value.split("-")[0],
            month: e.target.value.split("-")[1],
        }
        if((18>=today.getFullYear()-uye.year)||(today.getFullYear()-uye.year>90)){
            setError({...error, dogumtarihi: "yasiniz bayilik icin uygun degil"})
            if((today.getFullYear()-uye.year===18)&&(today.getMonth()-uye.month)>-3){
                setError({...error,dogumtarihi:""})
            }
        }else{setError({...error,dogumtarihi:""})}
    }//bayilik alana kadar 18ine girer diye siniri 17 yas 9 ay yaptim daha net olmasi icin gun de ayarlanilabilirdi


    const lokasyonSecenekler = { //select icin data

        Istanbul: {
            ilceler: ["Kadikoy", "Besiktas", "Sariyer"],
            semtler: {
                Kadikoy: ["Moda", "Fenerbahce", "Suadiye", "Bostanci", "Erenkoy"],
                Besiktas: ["Levent", "Etiler", "Ortakoy", "Bebek", "Arnavutkoy"],
                Sariyer: ["Tarabya", "Yenikoy", "Maslak", "Zekeriyakoy", "Rumelihisari"],

            }
        },
        Edirne: {
            ilceler: ["Merkez", "Uzunkopru", "Ipsala", "Kesan", "Havsa"],
            semtler: {
                Merkez: ["Sabuni", "Karaagac", "Dilaverbey", "Yancikci", "Menzilahir"],
                Uzunkopru: ["Mescit", "Cumhuriyet", "Kurtulus", "Muratli", "Sehitler"],
                Ipsala: ["Saricaali", "Yeniciftlik", "Fatih", "Sultan", "Ataturk"],
                Kesan: ["Cumhuriyet", "Yukari Zaferiye", "Asagi Zaferiye", "Yeni Mahalle", "Ispat Cami"],
                Havsa: ["Hacigazi", "Ascioglu", "Ataturk", "Istasyon", "Carsi"],
            }
        },
        Canakkale: {
            ilceler: ["Merkez", "Gelibolu", "Lapseki"],
            semtler: {
                Merkez: ["Kemalpasa", "Cevatpasa", "Fevzipasa", "Barbaros", "Kepez"],
                Gelibolu: ["Camikebir", "Hoca Hamza", "Cevdet Pasa", "Yazicioglu", "Eceabat"],
                Lapseki: ["Cardak", "Umurbey", "Suluca", "Tayfur", "Cumhuriyet"],
            }
        }
    };

    const [il, setIl] = useState("");
    const [ilce, setIlce] = useState("");
    const[semt, setSemt] = useState("");

    const handleIlChange = (e)=> {
        setIl(e.target.value);
        setIlce("");
        setSemt("");
    }
    const handleIlceChange = (e)=> {
        setIlce(e.target.value);
        setSemt("");
    }
    const handleSemtChange = (e)=> {
        setSemt(e.target.value);
        setFormData({...formData , lokasyon: `${il} / ${ilce} / ${e.target.value}`});
    }
    const [message, setMessage] = useState("")
    return(
        <div>
            <div className="navArkaPlan"><NavigasyonBari/></div>
            <div className="formArkaPlan mt-3 mb-3">
                <div>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <label>İSİM SOYİSİM:</label>
                            <Form.Control
                                type={'text'}
                                name={"isim"}
                                value={formData.isim}
                                placeholder={"Isminizi giriniz"}
                                onChange={handleIsimChange}
                                required={true}>
                            </Form.Control>
                            {error.isim && <Alert variant={'danger'}>{error.isim}</Alert>}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <label>TC KİMLİK NUMARASI:</label>
                            <Form.Control
                                type={"number"}
                                name={"tc"}
                                maxLength={11}
                                value={formData.tc}
                                placeholder={"TC'nizi giriniz"}
                                onChange={handleTcChange}
                                required={true}>
                            </Form.Control>
                            {error.tc && <Alert variant={'danger'}>{error.tc}</Alert>}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <label>ADRESS</label>
                            <Form.Control as='textarea'
                                          name={"adres"}
                                          value={formData.adres}
                                          placeholder={"Lutfen acik adresinizi giriniz"}
                                          onChange={handleChange}
                                          required={true}>

                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <label>TELEFON:</label>
                            <Form.Control
                                type={"number"}
                                name={"telefon"}
                                value={formData.telefon}
                                placeholder={"Telefon numaranizi giriniz(basinda 0 olmadan)"}
                                onChange={handleTelefonChange}
                                required={true}>
                            </Form.Control>
                            {error.telefon && <Alert variant={'danger'}>{error.telefon}</Alert>}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <label>E-MAIL:</label>
                            <Form.Control
                                type={"email"}
                                name={"email"}
                                value={formData.email}
                                placeholder={"Email Adresinizi giriniz"}
                                onChange={handleChange}
                                required={true}>
                            </Form.Control>
                            {error.email && <Alert variant={'danger'}>{error.email}</Alert>}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <label>DOĞUM TARİHİ:</label>
                            <Form.Control
                                type={"date"}
                                name={"dogumTarihi"}
                                value={formData.dogumTarihi}
                                onChange={handleDogumTarihiChange}
                                required={true}>
                            </Form.Control>
                            {error.dogumtarihi && <Alert variant={'danger'}>{error.dogumtarihi}</Alert>}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <label>PERAKENDE TİCARETİ İLE UĞRAŞTINIZ MI? :</label>
                            <Form.Check
                                type={"radio"}
                                name={"tecrube"}
                                label={"yok"}
                                value={"yok"}
                                defaultChecked={true}
                                onChange={handleChange}>
                            </Form.Check>
                            <Form.Check
                                type={"radio"}
                                name={"tecrube"}
                                label={"1-3"}
                                value={"1-3 yil"}
                                onChange={handleChange}>
                            </Form.Check>
                            <Form.Check
                                type={"radio"}
                                name={"tecrube"}
                                label={"3-5"}
                                value={"3-5 yil"}
                                onChange={handleChange}>
                            </Form.Check>
                            <Form.Check
                                type={"radio"}
                                name={"tecrube"}
                                label={"5+"}
                                value={"5+ yil"}
                                onChange={handleChange}>
                            </Form.Check>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <label>LOKUMCU BABA’YI TERCİH ETMENİZİN SEBEBİ NEDİR?</label>
                            <Form.Control as="textarea"
                                          rows={3}
                                          name={"neden"}
                                          value={formData.neden}
                                          placeholder={"Neden bizimle calismak istediginizi kisaca belirtiniz"}
                                          onChange={handleChange}>
                            </Form.Control>
                        </Form.Group>
                        <label>YATIRIM MİKTARINIZ NEDİR?</label>
                        <InputGroup className="mb-3">
                            <Form.Control type={"number"}
                                          name={"yatirim"}
                                          value={formData.yatirim}
                                          onChange={handleYatirimChange}
                                          required={true}
                                          placeholder={"Yatirim miktarinizi giriniz"}>
                            </Form.Control>
                            <InputGroupText>TL</InputGroupText>
                        </InputGroup>
                        {error.yatirim && <Alert variant={'danger'}>{error.yatirim}</Alert>}
                        <Form.Group className="mb-3">
                            <label>EKLEMEK İSTEDİKLERİNİZ:</label>
                            <Form.Control as="textarea"
                                          rows={3}
                                          name={"ek"}
                                          placeholder={"Eklemek istediginiz bir sey varsa buraya yazabilirsiniz"}
                                          value={formData.ek}
                                          onChange={handleChange}>
                            </Form.Control>
                        </Form.Group>
                        <label>HANGİ İL/İLÇE/SEMT İÇİN LOKUMCU BABA İŞLETMECİLİĞİ DÜŞÜNÜYORSUNUZ?</label>
                        <Form.Group className="d-flex gap 2 mb-3 ">
                            <FormSelect required={true} value={il} onChange={handleIlChange} className={"flex-grow-1"}>
                                <option value={""}>IL</option>
                                {Object.keys(lokasyonSecenekler).map((iller) => (
                                    <option key={iller} value={iller}>{iller}</option>
                                ))}
                            </FormSelect>

                            {il && (
                                <FormSelect required={true} value={ilce} onChange={handleIlceChange}
                                            className={"flex-grow-1"}>
                                    <option value={""}>ILCE</option>
                                    {lokasyonSecenekler[il]?.ilceler.map((ilceler) => (
                                        <option key={ilceler.toString()} value={ilceler.toString()}>{ilceler}</option>
                                    ))}
                                </FormSelect>)}
                            {ilce && (
                                <FormSelect required={true} value={semt} onChange={handleSemtChange}
                                            className={"flex-grow-1"}>
                                    <option value={""}>SEMT</option>
                                    {lokasyonSecenekler[il]?.semtler[ilce]?.map((semtler) => (
                                        <option key={semtler} value={semtler}>{semtler}</option>
                                    ))}
                                </FormSelect>)}
                        </Form.Group>
                        <Row>
                            <Col xs xxl></Col>
                            <Col xs xxl></Col>
                            <Col xs="auto">
                                <Button className={"mr-auto"} variant="primary" size={"lg"} type="submit">Yolla</Button>
                            </Col>
                        </Row>
                    </Form>
                </div>

                <Modal
                    size="sm"
                    show={modal}
                    onHide={() => setModal(false)}
                    aria-labelledby="example-modal-sizes-title-sm"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-sm">
                            DIKKAT
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{message}</Modal.Body>
                </Modal>
            </div>
        </div>


    )

}
export default BasvuruFormu

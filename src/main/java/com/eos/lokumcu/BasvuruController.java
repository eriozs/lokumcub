package com.eos.lokumcu;
import com.eos.lokumcu.Entities.BasvuruDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
public class BasvuruController {

    @Autowired
    BasvuruService basvuruService;

    @CrossOrigin(origins = "http://localhost:5173/")
    @PostMapping("/basvur")
    public ResponseEntity<String> kaydetBasvuru(@RequestBody BasvuruDTO basvuruDTO) {
        String hata="";
        if(basvuruService.tcKontrol(basvuruDTO.getTc())|| basvuruService.emailKontrol(basvuruDTO.getEmail())|| basvuruService.telefonKontrol(basvuruDTO.getTelefon())) {
            if(basvuruService.tcKontrol(basvuruDTO.getTc())) {
                hata+="Girdiginiz TC sisteme zaten kayitli";
            }
            if(basvuruService.emailKontrol(basvuruDTO.getEmail())) {
                hata+="\n Girdiginiz email sisteme zaten kayitli";
            }
            if(basvuruService.telefonKontrol(basvuruDTO.getTelefon())) {
                hata+="\n Girdiginiz telefon sisteme zaten kayitli";
            }
            return new ResponseEntity<>(hata, HttpStatus.CONFLICT);
        }else {
            basvuruService.saveBasvuru(basvuruDTO);
            return new ResponseEntity<>("Basvurunuzu teslim aldik",HttpStatus.CREATED);}


    }
}

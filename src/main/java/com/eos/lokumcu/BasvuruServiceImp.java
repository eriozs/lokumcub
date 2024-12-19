package com.eos.lokumcu;

import com.eos.lokumcu.Entities.Basvuru;
import com.eos.lokumcu.Entities.BasvuruDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BasvuruServiceImp implements BasvuruService {

    @Autowired
    BasvuruRepository basvuruRepository;
    @Override
    public Basvuru BasvuruDTOToBasvuru (BasvuruDTO basvuruDTO) { //mapper
        Basvuru basvuru;
        basvuru = Basvuru.builder()
                .tc(basvuruDTO.getTc())
                .isim(basvuruDTO.getIsim())
                .adayAdres(basvuruDTO.getAdayAdres())
                .telefon(basvuruDTO.getTelefon())
                .email(basvuruDTO.getEmail())
                .dogumTarihi(basvuruDTO.getDogumTarihi())
                .tecrube(basvuruDTO.getTecrube())
                .neden(basvuruDTO.getNeden())
                .lokasyon(basvuruDTO.getLokasyon())
                .yatirim(basvuruDTO.getYatirim())
                .ek(basvuruDTO.getEk())
                .build();

        if(basvuru.getEk().isEmpty()){  // null durumundan kacinmak icin zorunlu olmayan diger ek kismi icin react kisminda bir atama yapiliyo
            basvuru.setEk("AUTO: Eklemek istenilen bir durum yoktur");}
        return basvuru;
    }
    public boolean tcKontrol (Long tc) { //ayni kisi adina birden fazla basvuru yapilmasin
        return basvuruRepository.existsBasvuruByTc(tc);
    }
    public boolean telefonKontrol(String telefon) {
        return basvuruRepository.existsBasvuruByTelefon(telefon);
    }
    public boolean emailKontrol(String email) {
        return basvuruRepository.existsBasvuruByEmail(email);
    }

    public void saveBasvuru(BasvuruDTO basvuruDTO) {
        basvuruRepository.save(BasvuruDTOToBasvuru(basvuruDTO));
    }
}

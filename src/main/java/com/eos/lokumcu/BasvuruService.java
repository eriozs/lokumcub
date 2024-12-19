package com.eos.lokumcu;

import com.eos.lokumcu.Entities.Basvuru;
import com.eos.lokumcu.Entities.BasvuruDTO;


public interface BasvuruService {
    void saveBasvuru(BasvuruDTO basvuruDTO);
    Basvuru BasvuruDTOToBasvuru(BasvuruDTO basvuruDTO);
   boolean tcKontrol(Long tc);
   boolean telefonKontrol(String telefon);
   boolean emailKontrol(String email);
}

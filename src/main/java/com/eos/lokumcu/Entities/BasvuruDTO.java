package com.eos.lokumcu.Entities;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Data
public class BasvuruDTO {
    private Long tc;
    private String isim;
    private String adayAdres;
    private String telefon;
    private String email;
    private String dogumTarihi;
    private String tecrube;
    private String neden;
    private String lokasyon;
    private Long yatirim;
    private String ek;
}

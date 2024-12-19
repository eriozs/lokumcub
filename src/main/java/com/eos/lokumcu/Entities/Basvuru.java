package com.eos.lokumcu.Entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Setter
@Getter
@Builder
@Table
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PACKAGE)
public class Basvuru {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;
    @Column(unique = true)
    private Long tc;
    private String isim;
    private String adayAdres;
    @Column(unique = true)
    private String telefon;
    @Column(unique = true)
    private String email;
    private String dogumTarihi;
    private String tecrube;
    private String neden;
    private String lokasyon;
    private Long yatirim;
    private String ek;
}

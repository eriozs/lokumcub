package com.eos.lokumcu;

import com.eos.lokumcu.Entities.Basvuru;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BasvuruRepository extends JpaRepository<Basvuru, Long> {
    boolean existsBasvuruByTc(long tc);
    boolean existsBasvuruByTelefon(String telefon);
    boolean existsBasvuruByEmail(String email);
}

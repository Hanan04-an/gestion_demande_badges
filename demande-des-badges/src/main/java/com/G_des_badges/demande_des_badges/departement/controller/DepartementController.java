package com.G_des_badges.demande_des_badges.departement.controller;

import com.G_des_badges.demande_des_badges.departement.entity.Departement;
import com.G_des_badges.demande_des_badges.departement.repository.DepartementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/departments")
@CrossOrigin(origins = "http://localhost:3001") // facultatif si CORS global est bien activé
public class DepartementController {

    @Autowired
    private DepartementRepository departementRepository;

    @GetMapping
    public List<Departement> getAllDepartments() {
        List<Departement> departements = departementRepository.findAll();
        System.out.println("Départements : " + departements.size());
        return departements;
    }

}

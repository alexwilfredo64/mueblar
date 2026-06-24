package project.backendmueblar.modules.auth.services;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import project.backendmueblar.exception.EmailAlreadyExistsException;
import project.backendmueblar.exception.EmailNotFoundException;
import project.backendmueblar.exception.PasswordNotMatchWithUserException;
import project.backendmueblar.exception.RoleNotFoundException;
import project.backendmueblar.modules.auth.dtos.UserAuthDTO;
import project.backendmueblar.modules.auth.dtos.UserCreateDTO;
import project.backendmueblar.modules.users.entities.RoleEntity;
import project.backendmueblar.modules.users.entities.UserEntity;
import project.backendmueblar.modules.users.repositories.RepositoryRole;
import project.backendmueblar.modules.users.repositories.RepositoryUser;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final RepositoryUser repositoryUser;
    private final RepositoryRole repositoryRole;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public void registerUser(UserCreateDTO userCreateDTO){
        Optional<UserEntity> user = repositoryUser.findByEmail(userCreateDTO.getEmail());
        if(user.isPresent()){
            throw new EmailAlreadyExistsException(String.format("User with email %s already exists", userCreateDTO.getEmail()));
        }

        UserEntity userEntity = new UserEntity();
        userEntity.setEmail(userCreateDTO.getEmail());
        userEntity.setFirstName(userCreateDTO.getName());
        userEntity.setLastName(userCreateDTO.getLastName());

        userEntity.setPasswordHash(passwordEncoder.encode(userCreateDTO.getPassword()));

        userEntity.setEnabled(true);

        Optional<RoleEntity> roleEntity = repositoryRole.findByRoleName("Cliente");
        if(!(roleEntity.isPresent())){
            throw new RoleNotFoundException("Role does not exist");
        }
        userEntity.setRoleEntity(roleEntity.get());
        repositoryUser.save(userEntity);
    }

    public String loginUser(UserAuthDTO userAuthDTO){
        Optional<UserEntity> user = repositoryUser.findByEmail(userAuthDTO.getEmail());
        if(!(user.isPresent())){
            throw new EmailNotFoundException(String.format("Invalid Email", userAuthDTO.getEmail()));
        }

        if (!passwordEncoder.matches(userAuthDTO.getPassword(), user.get().getPasswordHash())) {
            throw new PasswordNotMatchWithUserException("Incorrect Password");
        }



    }
}

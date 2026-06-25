package project.backendmueblar.modules.auth.services;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import project.backendmueblar.exception.*;
import project.backendmueblar.modules.auth.dtos.UserAuthDTO;
import project.backendmueblar.modules.auth.dtos.UserCreateDTO;
import project.backendmueblar.modules.users.entities.RoleEntity;
import project.backendmueblar.modules.users.entities.UserEntity;
import project.backendmueblar.modules.users.repositories.RepositoryPermission_X_Role;
import project.backendmueblar.modules.users.repositories.RepositoryRole;
import project.backendmueblar.modules.users.repositories.RepositoryUser;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final RepositoryUser repositoryUser;
    private final RepositoryRole repositoryRole;
    private final PasswordEncoder passwordEncoder;
    private final RepositoryPermission_X_Role repositoryPermission_X_Role;
    private final JwtService jwtService;

    @Transactional
    public void registerUser(UserCreateDTO userCreateDTO){
        Optional<UserEntity> user = repositoryUser.findByEmail(userCreateDTO.getEmail());

       // Bad Responses //
        if(user.isPresent()){
            throw new EmailAlreadyExistsException(String.format("User with email %s already exists", userCreateDTO.getEmail()));
        }
        Optional<RoleEntity> roleEntity = repositoryRole.findByRoleName("Cliente");
        if(!(roleEntity.isPresent())){
            throw new RoleNotFoundException("Role does not exist");
        }

        // Good Response
        UserEntity userEntity = new UserEntity();
        userEntity.setEmail(userCreateDTO.getEmail());
        userEntity.setFirstName(userCreateDTO.getName());
        userEntity.setLastName(userCreateDTO.getLastName());

        userEntity.setPasswordHash(passwordEncoder.encode(userCreateDTO.getPassword()));
        userEntity.setEnabled(true);
        userEntity.setRoleEntity(roleEntity.get());
        repositoryUser.save(userEntity);
    }

    public String loginUser(UserAuthDTO userAuthDTO){
        Optional<UserEntity> optionalUser = repositoryUser.findByEmail(userAuthDTO.getEmail());

        // Bad Responses //
        if(!(optionalUser.isPresent())){
            throw new EmailNotFoundException(String.format("Invalid Email", userAuthDTO.getEmail()));
        }
        if (!passwordEncoder.matches(userAuthDTO.getPassword(), optionalUser.get().getPasswordHash())) {
            throw new PasswordNotMatchWithUserException("Incorrect Password");
        }
        if(!(optionalUser.get().getEnabled())){
            throw new UserDisabledException("Disabled User");
        }

        // Good Response
        UserEntity user = optionalUser.get();

        List<Object[]> listOfEndpointsAndPermissions = repositoryPermission_X_Role.findEndpointsAndPermission(user);

        if(listOfEndpointsAndPermissions.isEmpty()){
            throw new NoRelatedPermissionsException("No permissions");
        }

        Map<String, Integer> endpointsAndPermissionsMap = listOfEndpointsAndPermissions.stream()
                .collect(Collectors.toMap(
                        row -> (String) row[0],
                        row -> ((Number) row[1]).intValue()
                ));

        return jwtService.generateToken(user, endpointsAndPermissionsMap);
    }
}

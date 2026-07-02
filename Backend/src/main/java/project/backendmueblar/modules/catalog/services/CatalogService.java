package project.backendmueblar.modules.catalog.services;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import project.backendmueblar.exception.catalog.ProductNotFoundException;
import project.backendmueblar.modules.catalog.dtos.*;
import project.backendmueblar.modules.catalog.entities.*;
import project.backendmueblar.modules.catalog.repositories.RepositoryProduct;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CatalogService {

    private final RepositoryProduct repositoryProduct;

    public ProductResponseDTO getSpecificProduct(String modelOfProduct, boolean simpleVariation) {
        Optional<ProductEntity> optionalProduct = repositoryProduct.findByModelName(modelOfProduct);
        if (!(optionalProduct.isPresent())) {
            throw new ProductNotFoundException("Product was not Found");
        }

        ProductEntity product  = optionalProduct.get();
        ProductResponseDTO productResponseDTO = new ProductResponseDTO();
        //
        productResponseDTO.setModel(product.getModelName());
        //
        productResponseDTO.setDescription(product.getDescription());
        //
        productResponseDTO.setEnable(product.getEnabled());
        //
        productResponseDTO.setDimensions(product.getDimensions());
        //
        List<VariationResponseDTO> variationResponseDTOList = getVariationResponseDTOS(product);
        productResponseDTO.setVariations(variationResponseDTOList);
        //
        List<CategoryResponseDTO> categoryResponseDTOList = getCategoryResponseDTOS(product);
        productResponseDTO.setCategories(categoryResponseDTOList);

        return productResponseDTO;
    }

    private List<CategoryResponseDTO> getCategoryResponseDTOS(ProductEntity product) {
        List<Product_X_CategoryEntity> productXCategoryEntityList = product.getProductXCategoryEntityList();
        List<CategoryResponseDTO> categoryResponseDTOList = new ArrayList<>();

        for (Product_X_CategoryEntity thisProduct_X_Category : productXCategoryEntityList) {
            CategoryEntity categoryEntity = thisProduct_X_Category.getCategoryEntity();

            CategoryResponseDTO categoryResponseDTO = new CategoryResponseDTO();

            categoryResponseDTO.setId(categoryEntity.getIdCategory());
            categoryResponseDTO.setName(categoryEntity.getNameCategory());
            categoryResponseDTOList.add(categoryResponseDTO);
        }
        return categoryResponseDTOList;
    }

    private List<AttributeSummaryDTO> getAttributeSummaryDTOS(VariationEntity thisVariationEntity) {
        List<Attribute_X_VariationEntity> attribute_X_VariationEntityList = thisVariationEntity.getAttributeXVariationEntities();
        List<AttributeSummaryDTO> attributeSummaryDTOList = new ArrayList<>();

        for (Attribute_X_VariationEntity thisAttribute_X_VariationEntity : attribute_X_VariationEntityList) {
            AttributeEntity thisAttributeEntity = thisAttribute_X_VariationEntity.getAttributeEntity();

            AttributeSummaryDTO attributeSummaryDTO = new AttributeSummaryDTO();

            attributeSummaryDTO.setId(thisAttributeEntity.getAttributeId());
            attributeSummaryDTO.setValue(thisAttribute_X_VariationEntity.getAttribueValue());

            attributeSummaryDTOList.add(attributeSummaryDTO);
        }
        return attributeSummaryDTOList;
    }

    private List<VariationResponseDTO> getVariationResponseDTOS(ProductEntity thisProductEntity) {
        List<VariationEntity> variationEntityList = thisProductEntity.getVariationEntityList();
        List<VariationResponseDTO> variationResponseDTOList = new ArrayList<>();

        for (VariationEntity thisVariationEntity : variationEntityList) {
            VariationResponseDTO thisVariationResponseDTO = new VariationResponseDTO();
            //
            thisVariationResponseDTO.setSku(thisVariationEntity.getSku());
            //
            thisVariationResponseDTO.setName(thisVariationEntity.getVariationName());
            //
            List<ThumbnailEntity> thumbnailEntityList = thisVariationEntity.getThumbnailEntities();
            thisVariationResponseDTO.setThumbnail(thumbnailEntityList.getFirst().getThumbnailPath());
            thumbnailEntityList.removeFirst();
            List<String> thumbnailResponseDTOList = new ArrayList<>();
            for(ThumbnailEntity thisThumbnailEntity : thumbnailEntityList) {
                thumbnailResponseDTOList.add(thisThumbnailEntity.getThumbnailPath());
            }
            thisVariationResponseDTO.setImgs(thumbnailResponseDTOList);
            //
            thisVariationResponseDTO.setInstance_params(thisVariationEntity.getInstationParameters());
            //
            thisVariationResponseDTO.setModel_3d(thisVariationEntity.getModel3dPath());
            //
            thisVariationResponseDTO.setPrice(thisVariationEntity.getPrice());
            //
            thisVariationResponseDTO.setTop(thisVariationEntity.getIsTop());
            //
            thisVariationResponseDTO.setEnabled(thisVariationEntity.getEnabled());
            //
            List<AttributeSummaryDTO> attributeSummaryDTOList = getAttributeSummaryDTOS(thisVariationEntity);
            thisVariationResponseDTO.setAtribs(attributeSummaryDTOList);

            variationResponseDTOList.add(thisVariationResponseDTO);
        }
        return variationResponseDTOList;
    }

}

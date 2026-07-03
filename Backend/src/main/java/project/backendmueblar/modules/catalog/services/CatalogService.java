package project.backendmueblar.modules.catalog.services;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import project.backendmueblar.exception.catalog.NotExistentResourceException;
import project.backendmueblar.exception.catalog.ProductAlreadyExistException;
import project.backendmueblar.exception.catalog.ResourceNotFoundException;
import project.backendmueblar.modules.catalog.dtos.*;
import project.backendmueblar.modules.catalog.dtos.request.ProductCreateRequestDTO;
import project.backendmueblar.modules.catalog.dtos.response.CategoryResponseDTO;
import project.backendmueblar.modules.catalog.dtos.response.ProductResponseDTO;
import project.backendmueblar.modules.catalog.dtos.response.VariationResponseDTO;
import project.backendmueblar.modules.catalog.entities.*;
import project.backendmueblar.modules.catalog.repositories.*;

import java.util.*;

@Service
@RequiredArgsConstructor
public class CatalogService {

    private final RepositoryProduct repositoryProduct;
    private final RepositoryCategory repositoryCategory;
    private final RepositoryVariation repositoryVariation;
    private final RepositoryThumbnail repositoryThumbnail;
    private final RepositoryAttribute repositoryAttribute;
    private final RepositoryAttribute_X_Variation repositoryAttribute_X_Variation;
    private final RepositoryAttribute_X_Product repositoryAttribute_X_Product;
    private final RepositoryProduct_X_Category repositoryProduct_X_Category;

    @Transactional
    public void createProductAndVariations(ProductCreateRequestDTO productCreateRequestDTO) {
        Optional<ProductEntity> optionalProduct = repositoryProduct.findByModelName(productCreateRequestDTO.getModel());
        if (optionalProduct.isPresent()) {
            throw new ProductAlreadyExistException("Product already exist with that model name");
        }

        ProductEntity productEntity = new ProductEntity();
        productEntity.setModelName(productCreateRequestDTO.getModel());
        productEntity.setDescription(productCreateRequestDTO.getDescription());
        productEntity.setDimensions(productCreateRequestDTO.getDimensions());
        productEntity.setEnabled(productCreateRequestDTO.getEnable());

        ProductEntity productEntitySaved = repositoryProduct.save(productEntity);

        Set<String> attributes_X_Product = new HashSet<>();

        List<VariationResponseDTO> variationResponseDTOList = productCreateRequestDTO.getVariations();
        for(VariationResponseDTO thisVariationResponseDTO : variationResponseDTOList) {
            VariationEntity thisVariationEntity = new VariationEntity();
            thisVariationEntity.setSku(thisVariationResponseDTO.getSku());
            thisVariationEntity.setVariationName(thisVariationResponseDTO.getName());
            thisVariationEntity.setInstationParameters(thisVariationResponseDTO.getInstance_params());
            thisVariationEntity.setModel3dPath(thisVariationResponseDTO.getModel_3d());
            thisVariationEntity.setPrice(thisVariationResponseDTO.getPrice());
            thisVariationEntity.setIsTop(thisVariationResponseDTO.getTop());
            thisVariationEntity.setEnabled(thisVariationResponseDTO.getEnabled());
            thisVariationEntity.setProductEntity(productEntitySaved);

            VariationEntity variationEntitySaved = repositoryVariation.save(thisVariationEntity);

            List<ThumbnailEntity> thumbnailEntityList = new ArrayList<>();
            ThumbnailEntity thumbnailEntity = new ThumbnailEntity();
            thumbnailEntity.setThumbnailPath(thisVariationResponseDTO.getThumbnail());
            thumbnailEntity.setIsTop(true);
            thumbnailEntity.setVariationEntity(variationEntitySaved);
            repositoryThumbnail.save(thumbnailEntity);
            thumbnailEntityList.add(thumbnailEntity);

            List<String> thumbnailResponseList = thisVariationResponseDTO.getImgs();
            for(String thisThumbnailResponse: thumbnailResponseList) {
                ThumbnailEntity thisThumbnailEntity = new ThumbnailEntity();
                thisThumbnailEntity.setThumbnailPath(thisThumbnailResponse);
                thisThumbnailEntity.setIsTop(false);
                thisThumbnailEntity.setVariationEntity(variationEntitySaved);
                repositoryThumbnail.save(thisThumbnailEntity);
                thumbnailEntityList.add(thisThumbnailEntity);
            }

            thisVariationEntity.setThumbnailEntities(thumbnailEntityList);

            List<Attribute_X_VariationEntity> attribute_X_variationEntityList = new ArrayList<>();
            List<AttributeSummaryDTO> attributeSummaryDTOList = thisVariationResponseDTO.getAtribs();
            for(AttributeSummaryDTO thisAttributeSummaryDTO : attributeSummaryDTOList) {
                Optional<AttributeEntity> optionalAttribute = repositoryAttribute.findByAttributeId(thisAttributeSummaryDTO.getId());
                if(optionalAttribute.isEmpty()) {
                    throw new ResourceNotFoundException("Attribute was not found");
                }

                AttributeEntity thisAttributeEntity = optionalAttribute.get();

                Attribute_X_VariationEntity thisAttribute_X_VariationEntity = new Attribute_X_VariationEntity();
                thisAttribute_X_VariationEntity.setAttributeValue(thisAttributeSummaryDTO.getValue());
                thisAttribute_X_VariationEntity.setAttributeEntity(thisAttributeEntity);
                thisAttribute_X_VariationEntity.setVariationEntity(variationEntitySaved);
                repositoryAttribute_X_Variation.save(thisAttribute_X_VariationEntity);
                attribute_X_variationEntityList.add(thisAttribute_X_VariationEntity);

                if (!attributes_X_Product.contains(thisAttributeEntity.getAttributeId())) {
                    Attribute_X_ProductEntity thisAttribute_x_ProductEntity = new Attribute_X_ProductEntity();
                    thisAttribute_x_ProductEntity.setAttributeEntity(thisAttributeEntity);
                    thisAttribute_x_ProductEntity.setProductEntity(productEntitySaved);
                    repositoryAttribute_X_Product.save(thisAttribute_x_ProductEntity);
                    attributes_X_Product.add(thisAttributeEntity.getAttributeId());
                }
            }
            thisVariationEntity.setAttributeXVariationEntities(attribute_X_variationEntityList);
        }

        List<CategoryResponseDTO> categoryResponseDTOList = productCreateRequestDTO.getCategories();
        for(CategoryResponseDTO thisCategoryResponseDTO : categoryResponseDTOList) {
            Optional<CategoryEntity> optionalCategory = repositoryCategory.findByCategoryId(thisCategoryResponseDTO.getId());
            if(optionalCategory.isEmpty()){
                throw new ResourceNotFoundException("Category not found");
            }
            Product_X_CategoryEntity thisProduct_X_CategoryEntity = new Product_X_CategoryEntity();
            thisProduct_X_CategoryEntity.setCategoryEntity(optionalCategory.get());
            thisProduct_X_CategoryEntity.setProductEntity(productEntitySaved);
            repositoryProduct_X_Category.save(thisProduct_X_CategoryEntity);
        }
    }

    // ----------------------------------------------------------------------------------------------------------------------------------------//

    public ProductResponseDTO getSpecificProduct(String modelOfProduct, boolean simpleVariation) {
        Optional<ProductEntity> optionalProduct = repositoryProduct.findByModelName(modelOfProduct);
        if (optionalProduct.isEmpty()) {
            throw new ResourceNotFoundException("Product was not Found");
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
        List<VariationResponseDTO> variationResponseDTOList = getVariationResponseDTOS(product, simpleVariation);
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

            categoryResponseDTO.setId(categoryEntity.getCategoryId());
            categoryResponseDTO.setName(categoryEntity.getCategoryName());
            categoryResponseDTOList.add(categoryResponseDTO);
        }

        if(categoryResponseDTOList.isEmpty()) {
            throw new NotExistentResourceException("Does not exist Categories for Product");
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
            attributeSummaryDTO.setValue(thisAttribute_X_VariationEntity.getAttributeValue());

            attributeSummaryDTOList.add(attributeSummaryDTO);
        }
        return attributeSummaryDTOList;
    }

    private List<VariationResponseDTO> getVariationResponseDTOS(ProductEntity thisProductEntity, boolean simpleVariation) {
        List<VariationResponseDTO> variationResponseDTOList = new ArrayList<>();
        List<VariationEntity> variationEntityList = thisProductEntity.getVariationEntityList();
        if (!simpleVariation) {
            for (VariationEntity thisVariationEntity : variationEntityList) {
                VariationResponseDTO thisVariationResponseDTO = new VariationResponseDTO();
                //
                thisVariationResponseDTO.setSku(thisVariationEntity.getSku());
                //
                thisVariationResponseDTO.setName(thisVariationEntity.getVariationName());
                //
                List<ThumbnailEntity> thumbnailEntityList = thisVariationEntity.getThumbnailEntities();
                List<String> thumbnailResponseDTOList = new ArrayList<>();
                for(ThumbnailEntity thisThumbnailEntity : thumbnailEntityList) {
                    if (thisThumbnailEntity.getIsTop()) {
                        thisVariationResponseDTO.setThumbnail(thisThumbnailEntity.getThumbnailPath());
                    } else {
                        thumbnailResponseDTOList.add(thisThumbnailEntity.getThumbnailPath());
                    }
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

        } else {

            for(VariationEntity thisVariationEntity : variationEntityList) {
                VariationResponseDTO thisVariationResponseDTO = new VariationResponseDTO();
                thisVariationResponseDTO.setSku(thisVariationEntity.getSku());
                thisVariationResponseDTO.setName(thisVariationEntity.getVariationName());

                variationResponseDTOList.add(thisVariationResponseDTO);
            }
        }
        if(variationResponseDTOList.isEmpty()) {
            throw new NotExistentResourceException("Does not exist Variations for Product");
        }
        return variationResponseDTOList;
    }
}
